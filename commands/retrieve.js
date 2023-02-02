const fs = require('fs');
const path = require('path');
const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } = require('discord.js');

const { DB } = require("../classes/db.js");
const credentials = require("../.data-base/config.json");
const { Media } = require('../classes/classes.js');

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

      const db = new DB(credentials),
      fileNick = interaction.options.getString('file-nickname');
      // Hacky way of passing a callback
      // !!!MOVE TO FUNCTION LATER!!!
      db.retrieve(fileNick, async (err, result) => {
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
          const file = path.join('.data-base','file-storage','/', result.Name + result.Format),
          media = new AttachmentBuilder(file),
          embed = new EmbedBuilder()
          .setTitle(`Nickname: ${fileNick}`)
          .setDescription(`Description: ${fileDesc}`);
          
          await interaction.editReply( {content: 'File retrieved:', embeds: [embed]} );
          await interaction.followUp( {files: [media]} );
        }
      });
      await db.close();

  }
}