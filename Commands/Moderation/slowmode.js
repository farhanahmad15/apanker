const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slowmode")
    .setDescription("Set slowmode for this channel")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription("Duration of slowmode")
        .setRequired(true)
    )
    .setDMPermission(false),
  async execute(interaction) {
    const time = interaction.options.getInteger("time");
    const reason = "no reason";
    if (time > 21600) return interaction.reply({content: "<:error:1072081102644195358> | Value should be less than 21600 seconds", ephemeral: true});
    if( time < 0) return interaction.reply({content: '<:error:1072081102644195358> | Value should be a positive integer', ephemeral: true})
    

      interaction.channel
        .setRateLimitPerUser(time, reason)
        .then(
          interaction.reply({
            embeds:[new EmbedBuilder().setTitle('<:role_bot:1072070682957070337> | Slowmode Set').setDescription(`<:Discord_moderator:1063455264197586964> | Set this channels slowmode to ${time} seconds. Done by ${interaction.user.username}`)],
          })
        );
    
  },
};
