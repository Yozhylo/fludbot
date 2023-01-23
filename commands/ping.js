const { SlashCommandBuilder, Locale, User} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
  async execute(interaction) {
  console.log(`${User.username} called /ping`)
  await interaction.reply({content: 'Pong!', ephemeral: true});
  },
};