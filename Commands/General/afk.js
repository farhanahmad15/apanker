const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const afkModel = require("../../Models/Afk");
const { Red, Blue, Green, Yellow } = require("../../colors");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("afk")
    .setDescription("Toggle your afk status.")
    .setDMPermission(false),
  async execute(interaction) {
    const { guildId, user } = interaction;

    await afkModel
      .findOne({ Guild: guildId, UserID: user.id }, async (err, data) => {
        try {
          if (!data) {
            await afkModel.create({
              Guild: guildId,
              UserID: user.id,
              Afk: true,
            });
          } else if (data.Afk) {
            data.Afk = false;
            data.save();
            return interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setDescription("You are **not** AFK anymore.")
                  .setColor("#FFAA00"),
              ],
             
            });
          } else {
            data.Afk = true;
            data.save();
          }
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setDescription("You are now **AFK**.")
                .setColor("#0099FF"),
            ],
           
          });
        } catch (e) {
          console.log(e);
        }
      })
      .clone(); // .clone is preventing a mongodb error
  },
};
