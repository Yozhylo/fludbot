const fs = require('fs');
const path = require('path');
const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');

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

      const db = new DB(credentials);
      // Hacky way of passing a callback
      // !!!MOVE TO FUNCTION LATER!!!
      db.retrieve(interaction.options.getString('file-nickname'), (err, result) => {
        // Checking for errors and for empty set
        if(err) {
          console.error(err)
          throw err;
        }
        else if(result === undefined) interaction.editReply('Requested asset does not exist!');
        // Retrieving data, based on DB
        else {
        const storage = path.join('..','.data-base','file-storage','/');
        console.log(storage+result.Name);
        // const file = new AttachmentBuilder(storage+result[Name]);
        }
      });
      await db.close();
      await interaction.editReply('DONE')
  }
}