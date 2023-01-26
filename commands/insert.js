const { SlashCommandBuilder} = require("discord.js");
const { Media } = require("../classes/classes");
const download = require("../functions/download.js");

// const { DB } = require("../.data-base/db.js");
// const credentials = require("../.data-base/config.json");
// const db = new DB(credentials);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('insert')
    .setDescription('Inserts data into database')
    // .addStringOption( option => option
    //   .setName('Media URL')
    //   .setRequired(true))
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
      let options = interaction.options;
      let nick = options.getString('nickname');
      let media = options.getAttachment('media');
      let fileUrl = media.url;
      // let fileName = media.name;
      
      let file = new Media(nick, media.name, options.getString('description'));
      console.log(`${interaction.user.username} inserts data to DB\n`, interaction.options.resolved);
      // await () => {
      await download(fileUrl, file.name);
      // console.log('SUCCESS');
      // db.insert('file','nickname', 'tset');
      interaction.reply({content: 'The file you provided was successfully inserted into the database', ephemeral: true});
      // }
    }
}