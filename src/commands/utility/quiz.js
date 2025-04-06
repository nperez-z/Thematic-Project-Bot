const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quiz')
		.setDescription('Seelcts a random question.'),
	async execute(interaction) {
		//List of questions - basic for now
		const questions = [
			{
				question: "What is the longest that an elephant has ever lived? (That we know of)",
				options: ["A) 17 years", "B) 49 years", "C) 86 years", "D) 142 years"],
				answer: "C"
			},{
				question: "What planet is closest to the sun?",
				options: ["A) Earth", "B) Mercury", "C) Venus", "D) Jupiter"],
				answer: "B"
			},{
				question: "In darts, what's the most points you can score with a single throw? ",
				options: ["A) 20", "B) 50", "C) 60", "D) 100"],
				answer: "C"
			},{
				question: "What is the largest ocean on Earth?",
				options: ["A) Atlantic Ocean", "B) Indian Ocean", "C) Arctic Ocean", "D) Pacific Ocean"],
				answer: "D"
			},{
				question: "What are the main colors on the flag of Spain?",
				options: ["A) Black and yellow", "B) Blue and white", "C) Green and white", "D) Red and yellow"],
				answer: "D"
			}
		];

		//Pick a random question
		const question = questions[Math.floor(Math.random() * questions.length)];

		await interaction.reply(`${question.question}\n${question.options.join('\n')}\n\nReply with A, B, C, or D!`);

		//Make sure response is valid
		const filter = response => {
			return ['A', 'B', 'C', 'D'].includes(response.content.toUpperCase()) && response.author.id === interaction.user.id;
		};

		//20 Second time limit
		const collector = interaction.channel.createMessageCollector({ filter, time: 20000, max: 1 });

		//Handle user response
		collector.on('collect', collected => {
			if (collected.content.toUpperCase() === question.answer) {
				collected.reply('Correct!');
			} else {
				collected.reply(`Incorrect! The correct answer was ${question.answer}.`);
			}
		});
		
		//Handle if no user response
		collector.on('end', collected => {
			if (collected.size === 0) {
				interaction.followUp('No answer was given.');
			}
		});
	},
};
