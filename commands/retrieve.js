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
        // Retrieving data, based on DB
        else {
          let fileDesc;
          result.Description === 'null' || '' ? fileDesc = 'No description provided.' : fileDesc = result.Description;
          const file = path.join('.data-base','file-storage','/', result.Name + result.Format),
          media = new AttachmentBuilder(file),
          // const embed = new EmbedBuilder()
          //   .setTitle(`${fileNick}`)
          //   .setImage(`attachment://${path.basename(file)}`)
          //   .setDescription(`${result.Description}`);
          embed = new EmbedBuilder()
          .setTitle(`Nickname: ${fileNick}`)
          // .setImage(`attachment://${path.basename(file)}`)
          .setDescription(`Description: ${fileDesc}`);
          // await interaction.channel.send({ embeds: [embed], files: [media] });
          // await interaction.channel.send({ embeds: [embed] });
          // await interaction.channel.send( {files: [media]} );
          // await interaction.followUp( {embeds: [embed]} );
          await interaction.editReply( {content: 'File retrieved:', embeds: [embed]} );
          await interaction.followUp( {files: [media]} );
        }
      });
      await db.close();

  }
}