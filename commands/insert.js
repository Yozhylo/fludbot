const { SlashCommandBuilder, Locale, WebSocketManager, WebSocketShard, Attachment} = require("discord.js");
const { insert } = require('../.data-base/db');

// module.exports = {
//   data: new SlashCommandBuilder()
//         .setName('insert')
//         .setDescription('Inserts your string into data base')
//         .addStringOption(option =>
//           option.setName('string')
//             .setRequired(true)
//             .setDescription('The string to be inserted')),
//   async execute(interaction) {
//   insert('media', interaction.options.getString('string'));
//   await interaction.reply({content: 'String was inserted!', ephemeral: true});
//   },
// };
// module.exports = {
//   data: new SlashCommandBuilder()
//     .setName('post')
//     .setDescription('posts attachment')
//     .addAttachmentOption( option =>
//       option.setName('Attachment')
//       .setRequired(true)
//       .setDescription('media')),
//       async execute(interaction) {
//         console.log(JSON.stringify(Attachment.url));
//         await interaction.reply('d');
//       },
// };