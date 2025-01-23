const {EmbedBuilder, PermissionFlagsBits} = require('discord.js')
const { Red, Blue, Green, Yellow } = require("../../colors");

module.exports = {
    name: 'messageCreate',
    async execute(message){
        // if(message.member.permissions.has(PermissionFlagsBits.Administrator)) return;
        if (message.author.bot || !message.guild) return
        if(message.member.permissions.has(PermissionFlagsBits.Administrator)) return
         if(message.content.length> 10){
            var uppercaseCount = (message.content.match(/[A-Z]/g) || []).length;
        var percentage = uppercaseCount / message.content.length;
        if (percentage >= 0.6) {
            await message.delete().then(message.channel.send({embeds: [new EmbedBuilder().setDescription(`<:Discord_moderator:1063455264197586964> | ${message.author}, your message HAD TOO MANY CAPS!`).setColor('#CE3636')]}).then(sentMessage => {
                setTimeout(() => {
                    sentMessage.delete();
                }, 5000);
            }))
        }
        }
    }
}