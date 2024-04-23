const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  ChannelType,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rename-channels")
    .setDescription("Rename all channels in a category")
    .setDMPermission(false)
    .addChannelOption((option) =>
      option
        .addChannelTypes(ChannelType.GuildCategory)
        .setName("category")
        .setDescription(
          "Select the category where the channels names should be renamed."
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("firstsign")
        .setDescription("The sign before the name")
    )
    .addStringOption((option) =>
      option
        .setName("secondsign")
        .setDescription("The sign after the name")
    )
    
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const category = interaction.options.getChannel("category").id;
    const first = interaction.options.getString("firstsign") || '';
    const second = interaction.options.getString("secondsign") || '';

    interaction.guild.channels.cache
      .get(`${category}`)
      .children.cache.forEach((channel) => {
        let name = JSON.stringify(`${first}` + channel.name + `${second}`)
        channel.setName(name);
      });

    await interaction.reply({content: 'Done', ephemeral: true})
  },
};
