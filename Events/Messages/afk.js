const afkModel = require("../../Models/Afk");
const {EmbedBuilder} = require('discord.js')
const { Red, Blue, Green, Yellow } = require("../../colors");

module.exports = {
    name: 'messageCreate',
    async execute(message){
        if(message.author.bot || !message.guild) return;

        afkModel.findOne({Guild: message.guild.id, UserID: message.author.id}, async (err, data) =>{
            if(data && data.Afk){
                data.Afk = false;
                data.save();
            }
            return
        })

        const taggedMembers = message.mentions.users.map(msg => msg.id)

        if(taggedMembers.length> 0){
            taggedMembers.forEach(m =>{
                afkModel.findOne({Guild: message.guild.id, UserID: m}, async(err, data) =>{
                    if (data?.Afk){
                        const reply = await message.reply({
                          embeds: [new EmbedBuilder().setDescription(`${message.mentions.users.first().username} is currently AFK`).setColor('Gold')]
                        });
                      
                        
                        setTimeout(() => {
                          reply.delete();
                        }, 5000);
                      }
                })
            })
        }
    }
}