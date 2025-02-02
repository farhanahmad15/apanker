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

    try {
    const data = await afkModel.findOne(
      { Guild: guildId, UserID: user.id }
    );
    
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
                  .setColor(Yellow),
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
                .setColor(Blue),
            ],
          });
        } catch (e) {
          console.log(e);
        }
      
  },
};
