const { SlashCommandBuilder } = require("discord.js");

const {Extension, Media} = require("../classes/classes.js")
const { DB } = require("../classes/db.js");
const CREDENTIALS = require("../.data-base/config.json");

const deleteFile = require("../functions/delete-file.js")

module.exports = {
  data: new SlashCommandBuilder()
  .setName('drop')
  .setDescription('Removes the file from database')
  .addStringOption(option => option
    .setName('file-nickname')
    .setDescription('The nickname of the file, to be removed')
    .setRequired(true)),
    async execute(interaction) {
      await interaction.deferReply();

      const DATABASE = new DB(CREDENTIALS);
      const fileNick = interaction.options.getString('file-nickname');
      //Check if file exists in the db
      DATABASE.retrieve(fileNick, async (err, result) => {
        // Checking for errors and for empty set
        if(err) {
          console.error(err)
          throw err;
        }
        else if(result === undefined) interaction.editReply('Requested asset does not exist!');
        // Retrieving data from DB
        else {
          interaction.editReply('Asset found. Starting deletion');
          const FILE = new Media('', fileNick, result.Name, '', '', new Extension(result.Format, result.MimeType));
          //Delete file from disk
          // deleteFile(err, FILE, (err, resq) => {
            // if(err) {
            //   console.log(err);
            //   throw err;
            // } else {
              // DATABASE.drop()
              // }
              // })
              //Delete file from disk
              await deleteFile(err, FILE);
              //Remove records of file in database
              await DATABASE.drop(fileNick);
        }
      });
      // await DATABASE.close();
  }
}