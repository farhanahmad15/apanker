const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nick")
    .setDescription("Change the nickname of a user")
    .setDMPermission(false)
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("User to change the nickname of")
        .setRequired(true)
    )
    .addStringOption((option) =>
    option.setName('nickname')
    .setDescription('The users nickname')
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),
  async execute(interaction) {

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    const user = interaction.options.getMember("user");
    const name = interaction.options.getString("nickname") || 'Moderated Nickname ' + makeid(6);
    if (
      interaction.member.roles.highest.position <= user.roles.highest.position
    )
      return interaction.reply({
        content:
          "<:error:1072081102644195358> | Member you are trying to change the nickname has higher or equal roles as you",
        ephemeral: true,
      });
    else {
      user
        .setNickname(name)
        .then(
          interaction.reply({
            embeds: [new EmbedBuilder().setTitle('<:role_bot:1072070682957070337> | Nickname changed').setDescription(`<:Discord_moderator:1063455264197586964> | User nickname changed to: **${name}**`)],
            ephemeral: true,
          })
        );
    }
  },
};
