const {SlashCommandBuilder,
    EmbedBuilder} = require('discord.js')
const { Red, Blue, Green, Yellow } = require("../../colors");

module.exports = {
    data: new SlashCommandBuilder().setName('apologize').setDescription('Apologize to Someone').addUserOption((option) =>
    option.setName('user')
    .setDescription('The user you want to apologize to')
    .setRequired(true)).setDMPermission(false) ,
    async execute(interaction){
        const unm = interaction.options.getUser('user')
       const user = interaction.user.id
       interaction.reply({ embeds:[ new EmbedBuilder().setDescription(`<@${user}> apologizes to ${unm} `).setColor("#f05c51")
      ] })
    }
}