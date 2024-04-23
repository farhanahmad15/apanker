const {SlashCommandBuilder,
    EmbedBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder().setName('avatar').setDescription(`Get someone's avatar`).addUserOption((option) =>
    option.setName('user')
    .setDescription('The user you want to get the avatar of')).setDMPermission(false) ,
    async execute(interaction){
        
        const user = interaction.options.getMember('user') || interaction.member

        interaction.reply({embeds: [new EmbedBuilder().setTitle(`${user.user.username}'s Avatar`).setImage(user.displayAvatarURL({size: 512}))]})

     
    }
}