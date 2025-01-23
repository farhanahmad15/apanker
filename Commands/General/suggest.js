const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  Events,
} = require("discord.js");
const Schema = require("../../Models/Suggestion");
var timeout =[]
const { Red, Blue, Green, Yellow } = require("../../colors");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Suggest something.")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Name your suggestion.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Describe your suggestion.")
        .setRequired(true)
    )
    .setDMPermission(false),

  async execute(interaction, client) {
    if (timeout.includes(interaction.user.id)) return await interaction.reply({content: 'You are on command cooldown, try again in 1 hour', ephemeral:true})
    Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
      if (!data) return;
      let checkingChannel = data.checkingChannel;

      const confirm = new ButtonBuilder()
        .setCustomId("approve")
        .setLabel("Approve")
        .setStyle(ButtonStyle.Success);

      const row = new ActionRowBuilder().addComponents(confirm);

      const { guild, options, member } = interaction;

      const name = options.getString("name");
      const description = options.getString("description");

      const embed = new EmbedBuilder()
        .setColor("#36CE36")
        .setDescription(`A suggestion made by ${member}`)
        .addFields(
          { name: "Suggestion", value: `${name}` },
          { name: "Description", value: `${description}` }
        )
        .setFooter({
          text: member.user.username,
          iconURL: member.displayAvatarURL({ dynamic: true }),
        });
      await interaction.guild.channels.cache.get(checkingChannel).send({
        embeds: [embed],
        components: [row],
      });

      await interaction.reply({
        content:
          ":white_check_mark: | Your suggestion has been succesfully submitted for the moderators to check.",
        ephemeral: true,
      });

      
    });

    timeout.push(interaction.user.id)
    setTimeout(() =>{
      timeout.shift()
    }, 3600000)
    
  },
};
