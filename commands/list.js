// const fs = require('fs');
// const path = require('path');
const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } = require('discord.js');

const { DB } = require("../classes/db.js");
const CREDENTIALS = require("../.data-base/config.json");

module.exports = {
  data: new SlashCommandBuilder()
  .setName('list')
  .setDescription('List all accessible files for the database')
  .addIntegerOption(option => option
    .setName('amount')
    .setRequired(false)
    .setDescription('The number of entries to show')),
    async execute(interaction) {
      await interaction.deferReply();
      
      const DATABASE = new DB(CREDENTIALS);
      // Hacky way of passing a callback
      // !!!MOVE TO FUNCTION LATER!!!
      DATABASE.retrieveAll(async (err, files) => {
        const EMBED = new EmbedBuilder()
        .setTitle(`lold`);
        // Adding fields to the embed
        // WARNING SUPPPORTS ONLY UP TO 25 FIELDS
        // ADD A WAY TO CREATE NEW EMBEDS TO SUPPORT FOR 250 FIELDS

        for(const entry in files)
        {
          // console.log(entry);
          EMBED.addFields({name: `Item #${parseInt(entry) + 1}`, value:`Nickname: ${files[entry].Nickname}\n Description: ${files[entry].Description}.`, inline:true});
        }
        await interaction.editReply( {content: 'File retrieved:', embeds: [EMBED]} );
      });
      await DATABASE.close();
  }
}