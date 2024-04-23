const {ContextMenuCommandBuilder, ApplicationCommandType, PermissionFlagsBits, EmbedBuilder} = require('discord.js')
module.exports = {
    data: new ContextMenuCommandBuilder()
	.setName('User Information')
    
	.setType(ApplicationCommandType.User)
    .setDMPermission(false)
    ,
    async execute(interaction){
        const user = interaction.targetUser
            const member = interaction.targetMember
            const icon = interaction.targetUser.displayAvatarURL()
            const tag = interaction.targetUser.username
    
            const embed = new EmbedBuilder()
            .setDescription(`${user}`)
            .setColor('#0099FF')
            .setAuthor({name: tag, iconURL: icon})
            .setThumbnail(`${icon}`)
            .addFields(
                {name: 'Joined Server', value: `<t:${parseInt(member.joinedAt / 1000)}:R>`, inline: true},
                {name: 'Joined Discord', value: `<t:${parseInt(member.user.createdAt / 1000)}:R>`, inline: true},
                {name: `Roles[${member.roles.cache.size}] <:roles:1072070704486428743> `, value: `${member.roles.cache.map(r => r).join(`, ` )}`},
    
            )
            .setFooter({text: `User ID: ${user.id}`})
            .setTimestamp()
           
    
            await interaction.reply({embeds: [embed]})
    }
}