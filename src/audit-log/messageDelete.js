const { Events, AuditLogEvent, PermissionsBitField } = require('discord.js');

module.exports = {
    name: Events.MessageDelete,
    async execute(message) {
        console.log('messageDelete event triggered');
        // check for incomplete structure
        if (message.partial) {
            try {
                await message.fetch();
            }
            catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                return;
            }
        }

        // fetch log
        const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.MessageDelete,
        });

        // get the log
        const deletionLog = fetchedLogs.entries.first();

        // check if log exists
        let logMessage;
        if (!deletionLog) {
            logMessage = `A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`;
        }
        else {
            const { executor, target } = deletionLog;
            if (target.id === message.author.id) {
                logMessage = `A message by ${message.author.tag} was deleted by ${executor.tag}.`;
            }
            else {
                logMessage = `A message by ${message.author.tag} was deleted, but we don't know by who.`;
            }
        }

        if (message.content) {
            logMessage += `\n**Deleted Message:** ${message.content}`;
        }

        let adminChannel = message.guild.channels.cache.find(channel => channel.name === 'admin-bot-chat');
        if (!adminChannel) {
            try {
                adminChannel = await message.guild.channels.create({
                    name: 'admin-bot-chat',
                    // text channel
                    type: 0,
                    permissionOverwrites: [
                        // setting permissions for the channel
                        {
                            id: message.guild.roles.everyone.id,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: message.guild.members.me.roles.highest.id,
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

        try {
            await adminChannel.send(logMessage);
        }
        catch (error) {
            console.error('Failed to send message to admin-bot-chat channel:', error);
        }
    },
};