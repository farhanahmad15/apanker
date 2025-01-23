const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { Red, Blue, Green, Yellow } = require("../../colors");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick a user from the discord server.")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option =>
            option.setName("target")
                .setDescription("User to be kicked.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Reason for the kick.")
        ).setDMPermission(false),

    async execute(interaction) {
        const { channel, options } = interaction;

        const user = options.getUser("target");
        const reason = options.getString("reason") || "No reason provided";

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`<:error:1072081102644195358> | You can't take action on ${user.username} since they have a higher role.`)
            .setColor('#CE3636')

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });
        
        await member.send({embeds: [new EmbedBuilder().setTitle(`<:Discord_moderator:1063455264197586964> | You have been kicked from ${interaction.guild.name} `).addFields(
            {name: 'Reason', value: `${reason}`}
        ).setTimestamp()]})  

        await member.kick(reason);

        const embed = new EmbedBuilder()
            .setTitle('<:role_bot:1072070682957070337> | Kicked Member ')
            .setDescription(`<:Discord_moderator:1063455264197586964> | Succesfully kicked ${user} with reason: ${reason}`);

        await interaction.reply({
            embeds: [embed],
        });
    }
}