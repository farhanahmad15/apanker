// const {EmbedBuilder} = require('discord.js')

// module.exports = {
//   name: "ready",
//   once: true,
//   async execute(client) {
//     let channel = client.channels.cache.get('954631227816701976');

//     setInterval(async () => {
//         let messages = ['Make sure to read our rules [Here!](https://fomesserver.web.app/)', 'Check out the perks of boosting this server, Visit <#994873822144643193> for more info', 'Please make a ticket if you have an issue, Visit <#1012318008296882196>', 'Remember to keep the chat clean so the server is fun for everyone', 'Check out the perks for Inviter Roles here <#994873822144643193> '];
//         let randomMessage = messages[Math.floor(Math.random() * messages.length)];

//         let sentMessage = await channel.send({embeds: [new EmbedBuilder().setDescription(`${randomMessage}`).setColor('Gold')]});

//         setTimeout(() => {
//             sentMessage.delete();
//         }, 10000);
//     }, 3600000)
//   },
// };
