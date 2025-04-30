const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Rolls a die or dice')
    .addStringOption(option =>
      option.setName('dice')
        .setDescription('Dice to roll (e.g., d6, 2d20)')
        .setRequired(false)
    ),
  async execute(interaction) {
    const diceInput = interaction.options.getString('dice') || '1d6';
    const match = diceInput.match(/^(\d*)d(\d+)$/i);

    if (!match) {
      return interaction.reply('Invalid format. Use XdY (e.g., 2d6, d20)');
    }

    const rolls = parseInt(match[1]) || 1;
    const sides = parseInt(match[2]);

    if (rolls > 20 || sides > 1000) {
      return interaction.reply('That’s too many dice or sides!');
    }

    const results = [];
    for (let i = 0; i < rolls; i++) {
      results.push(Math.floor(Math.random() * sides) + 1);
    }

    const total = results.reduce((a, b) => a + b, 0);
    await interaction.reply(`🎲 Rolled ${diceInput}: [${results.join(', ')}] (Total: ${total})`);
  },
};