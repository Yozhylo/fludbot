const { SlashCommandBuilder} = require("discord.js");
const { Media, Extension } = require("../classes/classes");
const download = require("../functions/download.js");
const path = require('node:path');

const { DB } = require("../classes/db.js");
const credentials = require("../.data-base/config.json");
const db = new DB(credentials);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('insert')
    .setDescription('Inserts data into database')
    .addAttachmentOption( option => option
      .setName('media')
      .setDescription('The file to be uploaded')
      .setRequired(true))
    .addStringOption( option => option
      .setName('nickname')
      .setDescription('The nickname for the file to be retrived by.')
      .setRequired(true)
      .setMinLength(1)
      .setMaxLength(32))
    .addStringOption( option => option
      .setName('description')
      .setDescription('Description of the file')
      .setRequired(false)
      .setMaxLength(255)),
    async execute(interaction) {
      await interaction.deferReply({ephemeral: true});
      let options = interaction.options,
      nick = options.getString('nickname'),
      info = options.getAttachment('media'),
      description = options.getString('Description');
      ext = new Extension(path.extname(info.name));

      let file = 
      new Media(info.url, nick, info.name, description, '', ext);
      console.log(`${interaction.user.username} inserts data to DB\n`, await interaction.options.resolved);
      await download(info.url, info.name);
      await db.insert(file.reference, file.name, file.nickname, file.description, file.extension.format);
      await interaction.editReply('Download finished');
    }
}