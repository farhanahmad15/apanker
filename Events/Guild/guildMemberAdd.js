const {GuildMember, Embed, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder} = require("discord.js");
const Schema = require("../../Models/Welcome");

module.exports = {
    name: "guildMemberAdd",
    async execute(member) {
        Schema.findOne({Guild: member.guild.id}, async (err, data) => {
            if (!data) return;
            let channel = data.Channel;
            let Msg = data.Msg || " ";
            let Role = data.Role;

            const {user, guild} = member;
            const welcomeChannel = member.guild.channels.cache.get(data.Channel);

            const welcomeEmbed = new EmbedBuilder()
            .setTitle(`** ${member.user.id}, ${member.user.username} has joined the server!**`)
            
            .setColor('#FFAA00')
         
            .setTimestamp();
            const button = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setCustomId('primary')
                .setLabel(`Sent from: ${guild.name}`)
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true)
            )  

            member.send({content: `Hey ${member.user.username}, Welcome to **${guild.name}**, Please make sure to read the rules and be respectful to everyone in the server, even the bots. `, components: [button]}).catch(() =>{})

            welcomeChannel.send({embeds: [welcomeEmbed]});
            member.roles.add(data.Role);
        })
    }
}