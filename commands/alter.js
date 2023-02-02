const { SlashCommandBuilder } = require('discord.js');
const { DB } = require('../classes/db.js');
const CREDENTIALS = require('../.data-base/config.json');

module.exports = {
 data: new SlashCommandBuilder()
 .setName('alter')
 .setDescription('Alters data in the database.')
 .addSubcommand(subcommand => subcommand
    .setName('nickname')
    .setDescription('Alters the nickname of the file in the database')
    .addStringOption(option => option
      .setName('current')
      .setDescription('The the value to change')
      .setRequired(true)
      .setMinLength(1)
      .setMaxLength(32)
    )
    .addStringOption(option => option
      .setName('desired')
      .setDescription('The desired value')
      .setRequired(true)
      .setMinLength(1)
      .setMaxLength(32)
    )
  )
  .addSubcommand(subcommand => subcommand
    .setName('description')
    .setDescription('Alters the description of the file in the database')
    .addStringOption(option => option
      .setName('nickname')
      .setDescription('The the nickname of the file, which description to change')
      .setRequired(true)
      .setMinLength(1)
      .setMaxLength(32)
    )
    .addStringOption(option => option
      .setName('desired')
      .setDescription('The desired value')
      .setRequired(true)
      .setMinLength(1)
      .setMaxLength(255)
    )
  ),
  async execute(interaction) {
    await interaction.deferReply();
    // Conveniece args
    const opts = interaction.options;
    const ARGS = [];
    
    // Switch for subcommand distinction
    switch (interaction.options.getSubcommand()) {
      case 'nickname':
        ARGS.push('Nickname', opts.getString('current'), opts.getString('desired'));
      break;

      case 'description':
        ARGS.push('Description', opts.getString('nickname'), opts.getString('desired'));
      break;
        
      default:
        await interaction.editReply('A horrific accident has occured');
      break;
    }

    const DATABASE = new DB(CREDENTIALS);
    // Sending args to alter function
    // Callback checks if something was changed and replies
    await DATABASE.alter(ARGS[0], ARGS[1], ARGS[2], (err, result) => {
      if (err) {
        console.error(err)
        throw err;
      } else if(result === 0){
        interaction.editReply('No rows were edited. The refered asset either does not exit, or there is an error in the prompt.')
      } else {
        // Embed needed
        console.log(err, result);
        interaction.editReply('MAKE AN EMBED HERE')
      }
    })
    await DATABASE.close();
  }
}