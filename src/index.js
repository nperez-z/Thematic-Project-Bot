// Require the necessary discord.js classes
const dotenv = require('dotenv');
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, IntentsBitField } = require('discord.js');

dotenv.config();


// Create a new client instance
const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.GuildPresences,
		IntentsBitField.Flags.MessageContent,
	],
});

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandsFolders = fs.readdirSync(foldersPath);

for (const folder of commandsFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsPath = path.join(__dirname, 'Events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

const auditLogPath = path.join(__dirname, 'audit-log');
const auditLogFiles = fs.readdirSync(auditLogPath).filter(file => file.endsWith('.js'));

for (const file of auditLogFiles) {
    const filePath = path.join(auditLogPath, file);
    const event = require(filePath);
	console.log(`Registering event: ${event.name}`);
    client.on(event.name, (...args) => {
		console.log(`Event triggered: ${event.name}`);
		event.execute(...args);
	});
}

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);