const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const ms = require("ms");
const warnSchema = require("../../Models/Warns");
const { Red, Blue, Green, Yellow } = require("../../colors");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warn a member in the guild.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Select the user you wish to warn.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("What is the reason of the mute?")
        .setRequired(true)
    )
    .setDMPermission(false),

  async execute(interaction) {
    const target = interaction.options.getMember("target");

    const message = interaction.options.getString("reason");

    let Data = await warnSchema
      .findOne({ guildId: interaction.guild.id, userId: target.id })
      .catch(() => {
        console.log("Error");
      });

    if (Data) {
      Data.warns += 1;
      Data.reason.push(`${message}`);
      Data.save();
    } else {
      Data = new warnSchema({
        guildId: interaction.guild.id,
        userId: target.id,
        reason: [`${message}`],
        warns: 1,
      });
      await Data.save();
    }

    await target
      .send({
        embeds: [
          new EmbedBuilder()
            .setTitle(
              "<:role_bot:1072070682957070337> | You have been warned in " +
                interaction.guild.name
            )
            .setDescription(`Warn Message: ${message}`)
            .addFields(
              { name: "Warns:", value: `${Data.warns}` },
              { name: "Expires", value: `In 3 days` }
            )

            .setFooter({ text: "5+ warns in 3 days = Half day Timeout" })

            .setColor(Red)
            .setTimestamp(),
        ],
      })
      .catch(() => {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setDescription(
                `<:error:1072081102644195358> | ${target} has their DM'S off`
              )
              .setColor(Red),
          ],
          ephemeral: true,
        });
      });

    await interaction
      .reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(
              `<:Discord_moderator:1063455264197586964> | Warned ${target.user.username}`
            )
            .setDescription(`Warn Message: ${message}`)
            .addFields({ name: "Warns:", value: `${Data.warns}` })
            .setColor(Green),
        ],

        ephemeral: true,
      })
      .catch(() => {
        interaction.followUp({
          embeds: [
            new EmbedBuilder()
              .setDescription(
                `<:Discord_moderator:1063455264197586964> | Warned ${target.user.username}`
              )
              .addFields({ name: "Warns:", value: `${Data.warns}` })
              .setColor(Green),
          ],

          ephemeral: true,
        });
      });
    if (Data.warns > 5) {
      target.timeout(43200000, "5 Warns").catch(() => {
        console.log("Can't Timeout");
      });
      Data.warns = 0;
      Data.reason = [];
      Data.save();
    }
  },
};
