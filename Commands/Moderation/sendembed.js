const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  ModalBuilder,
  ActionRowBuilder,
  TextInputStyle,
  TextInputBuilder, Events
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sendembed")
    .setDescription("Send a nice embed to a channel")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel to send the embed")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("color")
        .setDescription("Choose a color")
        .setRequired(true)
        .addChoices(
          { name: "Red", value: "Red" },
          { name: "Blue", value: "Blue" },
          { name: "Green", value: "Green" },
          { name: "Yellow", value: "Yellow" }
        )
    )
   ,

  async execute(interaction, client) {
    const channel = interaction.options.getChannel("channel");

    const embed = new EmbedBuilder()
      .setAuthor({
        name: `${interaction.user.username}`,
        iconURL: `${interaction.member.displayAvatarURL({ dynamic: true })}`,
      })
     

    switch (interaction.options.getString("color")) {
      case "Red":
        {
          embed.setColor("#CE3636");
        }
        break;
      case "Blue":
        {
          embed.setColor("#0099FF");
        }
        break;
      case "Green":
        {
          embed.setColor("#36CE36");
        }
        break;
      case "Yellow":
        {
          embed.setColor("#FFAA00");
        }
        break;
    }

    const serverthing = await interaction.guild.channels.cache.get(channel.id);

    // await serverthing.send({ embeds: [embed] }).catch(() =>{})

    
    const modal = new ModalBuilder()
        .setCustomId("embed")
        .setTitle(`The contents of the embed.`)
        .addComponents(
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
            .setCustomId("title")
            .setLabel(`Title`)
            .setStyle(TextInputStyle.Short)
            
            ),
            new ActionRowBuilder().addComponents(
              new TextInputBuilder()
              .setCustomId("description")
              .setLabel(`Description`)
              .setStyle(TextInputStyle.Paragraph)
              
              ),new ActionRowBuilder().addComponents(
                new TextInputBuilder()
              .setCustomId("image")
              .setLabel(`Image Link`)
              .setStyle(TextInputStyle.Short)
              .setRequired(false)
            
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
            .setCustomId("footer")
            .setLabel(`Footer`)
            .setStyle(TextInputStyle.Short)
            
            ),
            );
            
            await interaction.showModal(modal).catch((e) => {console.error(e)});

            client.on(Events.InteractionCreate, async (interaction) =>{
              if(interaction.isModalSubmit()){
                if(interaction.customId === 'embed'){
                const title = interaction.fields.getTextInputValue("title") || 'No Title'
                const description = interaction.fields.getTextInputValue("description") || 'No Description'
                const image = interaction.fields.getTextInputValue("image") 
                const footer = interaction.fields.getTextInputValue("footer") || 'No Footer'
                  
                embed
                .setTitle(title)
                .setDescription(description)
                .setFooter({text: footer})
                if(image){
                  embed.setImage(image)
                }
                

                await serverthing.send({embeds: [embed]})

                await interaction.reply({content: `Embed Successfully sent to ${channel}`, ephemeral: true})
                }
              }
            })
            
          },
};
