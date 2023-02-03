const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
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
    const OPTS = interaction.options,
    ARGS = [];
    
    // Switch for subcommand distinction
    switch (interaction.options.getSubcommand()) {
      case 'nickname':
        ARGS.push('Nickname', OPTS.getString('current'), OPTS.getString('desired'));
      break;

      case 'description':
        ARGS.push('Description', OPTS.getString('nickname'), OPTS.getString('desired'));
      break;
        
      default:
        await interaction.editReply('A horrific accident has occured');
      break;
    }
    
    const DATABASE = new DB(CREDENTIALS),
    EMBED = new EmbedBuilder()
    .setTitle('Alter command result')
    .addFields(
      {name: 'Column that was updated:', value: `${ARGS[0]}`},
      {name: 'Identifier:', value: `${ARGS[1]}`, inline: true},
      {name: 'New value:', value: `${ARGS[2]}`, inline: true}
    );
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
        interaction.editReply({ embeds: [EMBED] })
      }
    })
    await DATABASE.close();
  }
}