const {ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder} = require('discord.js')
const { freemem, totalmem } = require('os');
const moment = require('moment')
module.exports ={
    data: new SlashCommandBuilder()
    .setName('about')
    .setDescription('Tells about Apanker bot')
    .setDMPermission(false),
    async execute(interaction){

        const cpuUsage = process.cpuUsage().system / process.cpuUsage().user;

        // Get the RAM usage of the current process (in bytes)
      
        const ramUsage = process.memoryUsage().rss;

        // Convert the RAM usage from bytes to MiB
        const ramUsageMiB = ramUsage / 1024 / 1024;
        const m = interaction.client.uptime
        function msToTime(ms) {
            let seconds = (ms / 1000).toFixed(1);
            let minutes = (ms / (1000 * 60)).toFixed(1);
            let hours = (ms / (1000 * 60 * 60)).toFixed(1);
            let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
            if (seconds < 60) return seconds + " Sec";
            else if (minutes < 60) return minutes + " Min";
            else if (hours < 24) return hours + " Hrs";
            else return days + " Days"
          }
        const embed = new EmbedBuilder()
        .setAuthor({ name: 'Fome #6462', iconURL: 'https://yt3.ggpht.com/TQSMCbxhiRRZzmVcwDF0bYQH5XN6ivZP2ygkwCBsLdooIOq4wrJKCkVu-FoXCzMkgWES6Mu8Eg=s88-c-k-c0x00ffffff-no-rj', url: 'https://fomesserver.web.app' })
        .setTitle(`${interaction.client.user.username}`)
        .setDescription(`${interaction.client.user.username} is a multipurpose Discord bot which at first was built for fun but later I made it an actual functioning bot. This bot can replace most of your bots in your server and the best part of all this bot is completely free to use. It also has various features like Moderation, Leveling System and more. `)
        .addFields(
            {name: 'Total Servers', value: `${interaction.client.guilds.cache.size}`},
            // {name: 'Total Shards', value: `${interaction.client.shards.size}`},
            {name: 'Hardware Usage', value: `Cpu Usage: ${cpuUsage.toFixed(2)}%, Ram Usage: ${ramUsageMiB.toFixed(2)} MiB`},
            {name: 'Uptime', value: `${msToTime(m)}`}
        )
        .setFooter({text: 'Made with ♥ using discord.js v14'})

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Visit the website!')
                .setStyle(ButtonStyle.Link)
                .setURL('https://fomesserver.web.app')
                
               
        );




        interaction.reply({embeds: [embed], components: [row]})
    }
}