const { SlashCommandBuilder } = require("discord.js");

// module.exports = {
//   data: new SlashCommandBuilder()
//         .setName('ping')
//         .setDescription('Replies with Pong!'),
//   async execute(interaction) {
//     // console.log(`${interaction.user.username} called /ping`)
//     await interaction.reply('test');
//   },
// };

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};