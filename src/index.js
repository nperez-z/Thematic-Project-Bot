// Require the necessary discord.js classes
const { Client, Events, IntentsBitField } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

// Create a new client instance
const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
	],
 });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.


client.on(Events.ClientReady, readyClient => {
	console.log(`✅ Ready! Logged in as ${readyClient.user.tag}`);
});

client.on('messageCreate', (message) => {
	if(message.author.bot) {
		return;
	}

	if(message.content === 'hello') {
		message.reply('Hello!');
	};
});

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);