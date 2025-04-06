const { Events } = require('discord.js');
const { isProfane } = require("no-profanity");

module.exports = {
	name: Events.MessageCreate,
	
	async execute(message) {
		if (message.author.bot) return;
        

		if (isProfane(message.content)) {
			try {
				await message.delete();
				await message.channel.send(`${message.author}, profanity detected`);
			} catch (err) {
				console.error('Failed to delete message:', err);
			}
		}
	}
};
