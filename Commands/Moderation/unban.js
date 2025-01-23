const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { Red, Blue, Green, Yellow } = require("../../colors");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Unban a user from the discord server.")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(option =>
            option.setName("userid")
                .setDescription("Discord ID of the user you want to unban.")
                .setRequired(true)
        ).setDMPermission(false),

    async execute(interaction) {
        const { channel, options } = interaction;

        const userId = options.getString("userid");

        try {
            await interaction.guild.members.unban(userId);

            const embed = new EmbedBuilder()
                .setTitle('<:role_bot:1072070682957070337>  | User Unabanned')
                .setDescription(`<:Discord_moderator:1063455264197586964> | Succesfully unbanned id ${userId} from the guild.`)
                .setColor('#0099FF')
                .setTimestamp();

            await interaction.reply({
                embeds: [embed], ephemeral: true
            });
        } catch (err) {
            console.log(err);

            const errEmbed = new EmbedBuilder()
                .setDescription(`Please provide a valid member's ID.`)
                .setColor('#CE3636');

            interaction.reply({ embeds: [errEmbed], ephemeral: true });
        }
    }
}