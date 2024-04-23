const {
  ComponentType,
  EmbedBuilder,
  SlashCommandBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("rule")
    .setDescription("Displays a selected rule")
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName("options")
        .setDescription("Choose an option")
        .setRequired(true)
        .addChoices(
          { name: "1", value: "1" },
          { name: "2", value: "2" },
          { name: "3", value: "3" },
          { name: "4", value: "4" },
          { name: "5", value: "5" },
          { name: "6", value: "6" },
        )
    ),
  async execute(interaction) {
    switch (interaction.options.getString("options")) {
      case "1": {
        interaction.channel.send({embeds: [new EmbedBuilder().setColor('#CE3636').setDescription('<:AcePurpleRoles:1072070657459900487>  Follow the Discord Terms of Service and Community Guidelines. This prohibits self bots, raiding, doxing, harmful links, scamming, DDoSing, ban evasion, and much more (see links below for more information). You must also be above the age of 13 to use Discord and be a part of this server.')]})
      }
      break;
      case "2": {
        interaction.channel.send({embeds: [new EmbedBuilder().setColor('#CE3636').setDescription(' <:AcePurpleRoles:1072070657459900487>  Be respectful and accepting when engaging with other members. This means no discrimination whatsoever, no harassment of other users, no slurs, no impersonation of other users, no toxicity, no arguments and no bullying. Keep this a safe environment for everyone!')]})

      }
      break;
      case "3": {
        interaction.channel.send({embeds: [new EmbedBuilder().setColor('#CE3636').setDescription('<:AcePurpleRoles:1072070657459900487> Avoid NSFW or controversial content. No conversations about sexual activities, drugs, or human indecencies. NSFW avatars, links, audio files, or images are also strictly prohibited. Please also avoid topics like politics, religion, or anything else that can be considered controversial. Avoid spreading misinformation.')]})

      }
      break;
      case "4": {
        interaction.channel.send({embeds: [new EmbedBuilder().setColor('#CE3636').setDescription(`<:AcePurpleRoles:1072070657459900487> Don’t spam. Avoid excessive and unnecessary messages, caps, emojis, text walls, spoiler messages, chains, images and pings. Please also keep things on topic and avoid pinging those who are not actively in the chat, especially admins and mods. Advertising within the server and within the DMs of server members is also in violation of this rule.
        `)]})

      }
      break;
      case "5": {
        interaction.channel.send({embeds: [new EmbedBuilder().setColor('#CE3636').setDescription(`<:AcePurpleRoles:1072070657459900487> Respect the staff and our tools. Obey the staff, what they say goes. Do not try to bypass any form of staff moderation, including moderation bots, and the rules in general. Respect and follow the spirit of the rules. Do not attempt to find or abuse loopholes. Please do not join the server on more than one account sussily.`)]})

      }
      break;
      case "6": {
        interaction.channel.send({embeds: [new EmbedBuilder().setColor('#CE3636').setDescription(`<:AcePurpleRoles:1072070657459900487> English Only Due to the fact our moderation team only knows English this server is English only , we will delete any messages in other languages. This is simply to keep the community safe from people who might use another language to bypass the rules.`)]})

      }
      break;
    }
  },
};
