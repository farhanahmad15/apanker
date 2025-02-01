const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const { Red, Blue, Green, Yellow } = require("../../colors");

module.exports ={
    data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Gets the information of a user')
    .addUserOption(option =>
        option.setName('user')
        .setDescription('Select a user')
        )
    .setDMPermission(false),

    async execute(interaction){
        const { options } = interaction
        const user = options.getUser('user') || interaction.user
        const member = await interaction.guild.members.cache.get(user.id)
        const icon = user.displayAvatarURL()
        const tag = user.username

        const embed = new EmbedBuilder()
        .setDescription(`${tag}'s information`)
        .setColor('#0099FF')
        .setAuthor({name: tag, iconURL: icon})
        .addFields(
            {name: "Name", value: `${user}`},
            {name: `Roles [${member.roles.cache.size}] <:roles:1072070704486428743> `, value: `${member.roles.cache.map(r => r).join(`, ` )}`},
            {name: 'Joined Server', value: `<t:${parseInt(member.joinedAt / 1000)}:R>`, inline: true},
            {name: 'Joined Discord', value: `<t:${parseInt(member.user.createdAt / 1000)}:R>`, inline: true},

        )
        .setFooter({text: `User ID: ${user.id}`})
        .setTimestamp()

        await interaction.reply({embeds: [embed]})
        // console.log(member.user.createdAt / 1000)
        
    }
}