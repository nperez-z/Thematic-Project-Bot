const { Events, AuditLogEvent, PermissionsBitField } = require('discord.js');

module.exports = {
    name: Events.GuildMemberRemove,
    async execute(member) {
        console.log('GuildMemberRemove event triggered');
        try {
            // need to fetch the audit logs to determine if this was a kick
            const fetchedLogs = await member.guild.fetchAuditLogs({
                limit: 1,
                type: AuditLogEvent.MemberKick,
            });

            // get the latest kick log
            const kickLog = fetchedLogs.entries.first();

            // if there's no kick log, or it's too old (more than 5 seconds), this was likely not a kick
            if (!kickLog || Date.now() - kickLog.createdTimestamp > 5000) {
                return;
            }

            // ensure this kick log is for the member who just left
            if (kickLog.target.id !== member.id) {
                return;
            }

            // get the moderator who performed the kick
            const { executor, reason } = kickLog;

            // create the log message
            const logMessage = '`**Member Kicked**\n`'
                + `**Member:** ${member.user.tag} (${member.id})\n`
                + `**Kicked by:** ${executor.tag} (${executor.id})\n`
                + `**Reason:** ${reason || 'No reason provided'}`;

            // find or create the admin channel
            let adminChannel = member.guild.channels.cache.find(channel => channel.name === 'admin-bot-chat');
            if (!adminChannel) {
                try {
                    adminChannel = await member.guild.channels.create({
                        name: 'admin-bot-chat',
                        // text channel
                        type: 0,
                        permissionOverwrites: [
                            // setting permissions for the channel
                            {
                                id: member.guild.roles.everyone.id,
                                deny: [PermissionsBitField.Flags.ViewChannel],
                            },
                            {
                                id: member.guild.members.me.roles.highest.id,
                                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                            },
                        ],
                    });
                    console.log('admin-bot-chat channel created successfully.');
                }
                catch (error) {
                    console.error('Failed to create admin-bot-chat channel:', error);
                    return;
                }
            }

            // send the log message to the admin channel
            await adminChannel.send(logMessage);
        }
        catch (error) {
            console.error('Error in memberKick event handler:', error);
        }
    },
};