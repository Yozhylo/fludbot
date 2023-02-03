const fs = require('fs');
const path = require('path');
const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } = require('discord.js');

const { DB } = require("../classes/db.js");
const credentials = require("../.data-base/config.json");

module.exports = {
  data: new SlashCommandBuilder()
  .setName('retrieve')
  .setDescription('Retrieves data from database')
  .addStringOption(option => option
    .setName('file-nickname')
    .setRequired(true)
    .setDescription('The nickname of the file to be retrieved')),
    async execute(interaction) {
      await interaction.deferReply();
      
      const DATABASE = new DB(credentials),
      fileNick = interaction.options.getString('file-nickname');
      // Hacky way of passing a callback
      // !!!MOVE TO FUNCTION LATER!!!
      DATABASE.retrieve(fileNick, async (err, result) => {
        // Checking for errors and for empty set
        if(err) {
          console.error(err)
          throw err;
        }
        else if(result === undefined) interaction.editReply('Requested asset does not exist!');
        // Retrieving data from DB
        else {
          let fileDesc;
          result.Description === 'null' || '' || 'NULL' ? fileDesc = 'No description provided.' : fileDesc = result.Description;
          const FILE = path.join('.data-base','file-storage','/', result.Name + result.Format),
          MEDIA = new AttachmentBuilder(FILE),
          EMBED = new EmbedBuilder()
          .setTitle(`Nickname: ${fileNick}`)
          .setDescription(`Description: ${fileDesc}`);
          
          await interaction.editReply( {content: 'File retrieved:', embeds: [EMBED]} );
          // Only follows up, if internet connection is stable
          await interaction.followUp( {files: [MEDIA]} );
        }
      });
      await DATABASE.close();
  }
}