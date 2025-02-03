const afkModel = require("../../Models/Afk");
const {EmbedBuilder} = require('discord.js')
const { Red, Blue, Green, Yellow } = require("../../colors");

module.exports = {
    name: 'messageCreate',
    async execute(message){
        if(message.author.bot || !message.guild) return;

       try {
         const data  = await afkModel.findOne({Guild: message.guild.id, UserID: message.author.id})
        
            if (data?.Afk) {
              data.Afk = false;
              data.save();
            }

        const taggedMembers = message.mentions.users.map(msg => msg.id)

        if(taggedMembers.length> 0){
            for (const m of taggedMembers) {
              // ✅ Use for...of, which works with await
              const data = await afkModel.findOne({
                Guild: message.guild.id,
                UserID: m,
              });

              if (data?.Afk) {
                const reply = await message.reply({
                  embeds: [
                    new EmbedBuilder()
                      .setDescription(
                        `${
                          message.mentions.users.first().username
                        } is currently AFK`
                      )
                      .setColor("Gold"),
                  ],
                });

                setTimeout(() => {
                  reply.delete();
                }, 5000);
              }
            }

        }
    }
    catch(e){
        console.log(e)
    }
    }
}