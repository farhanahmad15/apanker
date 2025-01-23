const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  ChannelType,
} = require("discord.js");
const { Red, Blue, Green, Yellow } = require("../../colors");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Create a poll and send it to a certain channel")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Describe the poll.")
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Where do you want to send the poll to?")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    )
    .addStringOption((option) =>
      option
        .setName("reactions")
        .setDescription(
          "The reactions you want there to be, (example: emoji, emoji)"
        )
    )
    .setDMPermission(false),
  async execute(interaction) {
    const { options } = interaction;
    const emojis = options.getString("reactions");

    const channel = options.getChannel("channel");
    const description = options.getString("description");

    const embed = new EmbedBuilder()
      .setColor("#0099FF")
      .setTitle(`${description}`)
      .setFooter({ text: interaction.user.username })
      .setTimestamp();

    try {
      const m = await channel.send({ embeds: [embed] });
      if (emojis) {
        const emojiArray = emojis.split(", ");

        emojiArray.forEach(
          async (emoji) => await m.react(emoji).catch(() => {})
        );
      } else {
        await m.react("✅");
        await m.react("❌");
      }
      await interaction.reply({
        content: "Poll was succesfully sent to the channel.",
        ephemeral: true,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
