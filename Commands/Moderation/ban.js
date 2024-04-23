const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban a user from the discord server.")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option =>
            option.setName("target")
                .setDescription("User to be banned.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Reason for the ban.")
        ).setDMPermission(false),

    async execute(interaction) {
        const { channel, options } = interaction;

        const user = options.getUser("target");
        const reason = options.getString("reason") || "No reason provided.";

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`<:error:1072081102644195358> | You can't take action on ${user.username} since they have a higher role.`)
            .setColor('#CE3636');

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });
        
        await member.send({embeds: [new EmbedBuilder().setTitle(`<:Discord_moderator:1063455264197586964> | You have been banned in ${interaction.guild.name} `).addFields(
            {name: 'Reason', value: `${reason}`}
        ).setTimestamp()]})    

        await member.ban({ reason });

        const embed = new EmbedBuilder()
            .setTitle('<:role_bot:1072070682957070337> | Member Banned')
            .setDescription(`<:Discord_moderator:1063455264197586964> | Succesfully banned ${user}`)
            .addFields({name: 'Reason', value: `${reason}`})
            .setColor('#0099FF')
            .setTimestamp()

        await interaction.reply({
            embeds: [embed]
        });
    }
}