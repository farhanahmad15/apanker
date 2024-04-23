const afkModel = require("../../Models/Afk");
const { ChannelType, PermissionFlagsBits } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "messageCreate",
  async execute(message) {
    // if(message.author.id === 849526087171571764){
    //     console.log('yessir')
    // }
    // console.log(message.author.id)
    if (message.author.id.toString() === "849526087171571764") {

        if(message.content === 'yo'){
            message.reply({embeds: [new EmbedBuilder().setDescription('[Guide](https://discordjs.guide/ )')]})
        }

    }
      
  },
};
