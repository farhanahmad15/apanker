const {SlashCommandBuilder,
    EmbedBuilder} = require('discord.js')
const { Red, Blue, Green, Yellow } = require("../../colors");

module.exports = {
    data: new SlashCommandBuilder().setName('thanks').setDescription('Thank someone').addUserOption((option) =>
    option.setName('user')
    .setDescription('The user you want to thank')
    .setRequired(true)).setDMPermission(false) ,
    async execute(interaction){
        const unm = interaction.options.getUser('user')
       const user = interaction.user.id
       interaction.reply({ embeds:[ new EmbedBuilder().setDescription(`<@${user}> thanks  ${unm} `).setColor(Green)
      ] })
    }
}