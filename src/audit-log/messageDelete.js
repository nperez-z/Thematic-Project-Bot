const { Events, AuditLogEvent } = require('discord.js');

module.exports = {
    name: Events.MessageDelete,
    async execute(message) {
        // check for incomplete structure
        if (message.partial) {
            try {
                await message.fetch();
            } catch (error) {
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
        if (!deletionLog) {
            console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);
            return;
        }

        const { executor, target } = deletionLog;

        // output the log NEED TO UPDATE TO SEND MESSAGE IN SERVER
        if (target.id === message.author.id) {
            console.log(`A message by ${message.author.tag} was deleted by ${executor.tag}.`);
        } else {
            console.log(`A message by ${message.author.tag} was deleted, but we don't know by who.`);
        }
    },
};