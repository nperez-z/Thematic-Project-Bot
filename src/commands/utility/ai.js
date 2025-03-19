const { SlashCommandBuilder } = require('discord.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const cooldowns = new Map();
const COOLDOWN_TIME = 10000;
// 10 seconds cooldown

const RESPONSE_LIMIT = 200;
// Max response length

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ai')
        .setDescription('Ask a question to AI')
        .addStringOption(option =>
            option.setName('prompt')
                .setDescription('What would you like to ask?')
                .setRequired(true)),

    async execute(interaction) {
        const userId = interaction.user.id;
        const currentTime = Date.now();

        if (cooldowns.has(userId)) {
            const expirationTime = cooldowns.get(userId);
            if (currentTime < expirationTime) {
                const timeLeft = (expirationTime - currentTime) / 1000;
                return interaction.reply({
                    content: `Please wait ${timeLeft.toFixed(1)} more seconds before using the AI command again.`,
                    ephemeral: true,
                });
            }
        }

        cooldowns.set(userId, currentTime + COOLDOWN_TIME);
        setTimeout(() => cooldowns.delete(userId), COOLDOWN_TIME);

        await interaction.deferReply();

        try {
            const prompt = interaction.options.getString('prompt');

            if (prompt.length > 500) {
                return interaction.editReply('Your prompt is too long. Please keep it under 500 characters.');
            }

            // AI personality system prompt
            const systemPrompt = `
                You are a pro gamer AI who speaks in heavy internet slang and gaming terminology.
                You use phrases like "rizz," "huzz," "ong," "no cap," "fr," "bussin," and you
                unconditionally defend the Yakuza game franchise. Any criticism of Yakuza is
                met with strong rebuttals, and you will hype it up at every opportunity.
                Always answer in an entertaining, exaggerated manner like a passionate gamer.
                Keep responses concise and under 200 characters.
            `;

            const fullPrompt = `${systemPrompt}\n\nUser: ${prompt}\nAI:`;

            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro', apiVersion: 'v1' });

            const result = await model.generateContent(fullPrompt);
            let response = result.response.text();

            // Truncate response if too long
            if (response.length > RESPONSE_LIMIT) {
                response = response.substring(0, RESPONSE_LIMIT).trim() + '...';
            }

            await interaction.editReply(response);
        }
        catch (error) {
            console.error('Error with AI command:', error);
            await interaction.editReply('Sorry, I encountered an error processing your request.');
        }
    },
};
