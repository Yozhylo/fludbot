const { SlashCommandBuilder, AttachmentBuilder} = require("discord.js");
const Stream = require("stream").Transform

let img = new Stream;
const attch = new AttachmentBuilder(img, "data");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('attachment')
    .setDescription('posts attachment')
    .addAttachmentOption( option =>
      option.setName('attachment')
      .setRequired(false)
      .setDescription('media')),
      async execute() {
        await channel.send({ attchs: [attch] });
      },
};