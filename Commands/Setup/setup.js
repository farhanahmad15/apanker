const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
  ChannelType,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
const welcomeSchema = require("../../Models/Welcome");
const verifySchema = require("../../Models/Verify");
const suggestionSchema = require("../../Models/Suggestion");
const levelingSchema = require("../../Models/Leveling");
const muteSchema = require("../../Models/Mute");
const logSchema = require("../../Models/Logs");
const TicketSetup = require("../../Models/TicketSetup"); 

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Setup Apanker V2 bot")
    .addSubcommand((command) =>
      command
        .setName("welcome")
        .setDescription("Set up your welcome message for the discord bot.")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("Channel for welcome messages.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("welcome-message")
            .setDescription("Enter your welcome message.")
            .setRequired(true)
        )
        .addRoleOption((option) =>
          option
            .setName("welcome-role")
            .setDescription("Enter your welcome role.")
            .setRequired(true)
        )
    )
    .addSubcommand((command) =>
      command
        .setName("verify")
        .setDescription("Set your verification channel")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("Send verification embed in this channel")
            .setRequired(true)
        )
        .addRoleOption((option) =>
          option
            .setName("verifiedrole")
            .setDescription("The role users will get when they are verified")
            .setRequired(true)
        )
        .addRoleOption((option) =>
          option
            .setName("unverifiedrole")
            .setDescription(
              "This role will be removed from the users when they are verified"
            )
            .setRequired(true)
        )
    )
    .addSubcommand((command) =>
      command
        .setName("suggestion")
        .setDescription(
          "Set up where the bot will send suggestions to be checked."
        )
        .addChannelOption((option) =>
          option
            .setName("checkingchannel")
            .setDescription(
              "Channel where the suggestions will be kept to be checked."
            )
            .setRequired(true)
        )
        .addChannelOption((option) =>
          option
            .setName("suggestionchannel")
            .setDescription(
              "Channel where the suggestions will finally end up after being checked by the mods."
            )
            .setRequired(true)
        )
    )
    .addSubcommand((command) =>
      command
        .setName("leveling")
        .setDescription("Setup the leveling system of apanker bot")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("The channel the levelup message will be sent")
            .setRequired(true)
        )
    )

    .addSubcommand((command) =>
      command
        .setName("mute")
        .setDescription("Set up your muting system for this server.")
        .addRoleOption((option) =>
          option
            .setName("mute-role")
            .setDescription("Enter your muted role.")
            .setRequired(true)
        )
    )

    .addSubcommand((command) =>
      command
        .setName("ticket")
        .setDescription("Create a ticket message.")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription(
              "Select the channel where the tickets should be created."
            )
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText)
        )
        .addChannelOption((option) =>
          option
            .setName("category")
            .setDescription(
              "Select the parent of where the tickets should be created."
            )
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildCategory)
        )
        .addChannelOption((option) =>
          option
            .setName("transcripts")
            .setDescription(
              "Select the channel where the transcripts should be sent."
            )
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText)
        )
        .addRoleOption((option) =>
          option
            .setName("handlers")
            .setDescription("Select the ticket handlers role.")
            .setRequired(true)
        )
        .addRoleOption((option) =>
          option
            .setName("everyone")
            .setDescription("Tag the everyone role.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("description")
            .setDescription("Set the description for the ticket embed.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("firstbutton")
            .setDescription("Format: (Name of button, Emoji)")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("secondbutton")
            .setDescription("Format: (Name of button, Emoji)")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("thirdbutton")
            .setDescription("Format: (Name of button, Emoji)")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("fourthbutton")
            .setDescription("Format: (Name of button, Emoji)")
            .setRequired(true)
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const { options, guild, user } = interaction;

    switch (sub) {
      case "welcome":
        {
          const welcomeChannel = options.getChannel("channel");
          const welcomeMessage = options.getString("welcome-message");
          const roleId = options.getRole("welcome-role");

          if (
            !interaction.guild.members.me.permissions.has(
              PermissionFlagsBits.SendMessages
            )
          ) {
            interaction.reply({
              content: "I don't have permissions for this.",
              ephemeral: true,
            });
          }

          welcomeSchema.findOne(
            { Guild: interaction.guild.id },
            async (err, data) => {
              if (!data) {
                const newWelcome = await welcomeSchema.create({
                  Guild: interaction.guild.id,
                  Channel: welcomeChannel.id,
                  Msg: welcomeMessage,
                  Role: roleId.id,
                });
              }
              interaction.reply({
                content: "Succesfully created a welcome message",
                ephemeral: true,
              });
            }
          );
        }

        break;
      case "verify":
        {
            // TODO: FIX THE MODAL THING
          const channel = interaction.options.getChannel("channel");
          const verifiedRole = interaction.options.getRole("verifiedrole");
          const unverified = interaction.options.getRole("unverifiedrole");

          if (
            !interaction.guild.members.me.permissions.has(
              PermissionFlagsBits.SendMessages
            )
          ) {
            interaction.reply({
              content: "I don't have permissions for this.",
              ephemeral: true,
            });
          }

          verifySchema.findOne(
            { Guild: interaction.guild.id },
            async (err, data) => {
              if (!data) {
                const newVerify = await verifySchema.create({
                  Guild: interaction.guild.id,
                  Role: verifiedRole.id,
                  Unverified: unverified.id,
                  Channel: channel.id,
                });
              }
            }
          );

          const modal = new ModalBuilder()
          .setCustomId("verifymessage")
          .setTitle(`The message you want to display with the rule`)
          .addComponents(
            new ActionRowBuilder().addComponents(
              new TextInputBuilder()
                .setCustomId("verifymessageInput")
                .setLabel(`Put something here like rules`)
                .setStyle(TextInputStyle.Paragraph)
            )
          );

        await interaction.showModal(modal).catch(() => {});
        }
        break;
      case "suggestion":
        {
          const checkingChannel = options.getChannel("checkingchannel");
          const suggestionChannel = options.getChannel("suggestionchannel");

          if (
            !interaction.guild.members.me.permissions.has(
              PermissionFlagsBits.SendMessages
            )
          ) {
            interaction.reply({
              content: "I don't have permissions for this.",
              ephemeral: true,
            });
          }

          suggestionSchema.findOne(
            { Guild: interaction.guild.id },
            async (err, data) => {
              if (!data) {
                const newSuggestion = await suggestionSchema.create({
                  Guild: interaction.guild.id,
                  checkingChannel: checkingChannel.id,
                  suggestionChannel: suggestionChannel.id,
                });
              }
              interaction.reply({
                content: "Succesfully set suggestion channel",
                ephemeral: true,
              });
            }
          );
        }
        break;
      case "leveling":
        {
        const levelingChannel = interaction.options.getChannel('channel')

          if (
            !interaction.guild.members.me.permissions.has(
              PermissionFlagsBits.SendMessages
            )
          ) {
            interaction.reply({
              content: "I don't have permissions for this.",
              ephemeral: true,
            });
          }

          levelingSchema.findOne(
            { Guild: interaction.guild.id },
            async (err, data) => {
              if (!data) {
                const newLeveling = await levelingSchema.create({
                  Guild: interaction.guild.id,
                  Channel: levelingChannel.id,
                });
              }
              interaction.reply({
                content: "Succesfully set level up channel",
                ephemeral: true,
              });
            }
          );
        }
        break;
      case "mute":
        {
          const roleId = options.getRole("mute-role");

          if (
            !interaction.guild.members.me.permissions.has(
              PermissionFlagsBits.SendMessages
            )
          ) {
            interaction.reply({
              content: "I don't have permissions for this.",
              ephemeral: true,
            });
          }

          muteSchema.findOne(
            { Guild: interaction.guild.id },
            async (err, data) => {
              if (!data) {
                const newMute = await muteSchema.create({
                  Guild: interaction.guild.id,
                  Role: roleId.id,
                });
              }
              interaction.reply({
                content: "Succesfully setup the muting system",
                ephemeral: true,
              });
            }
          );
        }
        break;
      case "ticket": {
        try {
          const channel = options.getChannel("channel");
          const category = options.getChannel("category");
          const transcripts = options.getChannel("transcripts");

          const handlers = options.getRole("handlers");
          const everyone = options.getRole("everyone");

          const description = options.getString("description");
          const firstbutton = options.getString("firstbutton").split(",");
          const secondbutton = options.getString("secondbutton").split(",");
          const thirdbutton = options.getString("thirdbutton").split(",");
          const fourthbutton = options.getString("fourthbutton").split(",");

          const emoji1 = firstbutton[1];
          const emoji2 = secondbutton[1];
          const emoji3 = thirdbutton[1];
          const emoji4 = fourthbutton[1];

          await TicketSetup.findOneAndUpdate(
            { GuildID: guild.id },
            {
              Channel: channel.id,
              Category: category.id,
              Transcripts: transcripts.id,
              Handlers: handlers.id,
              Everyone: everyone.id,
              Description: description,
              Buttons: [
                firstbutton[0],
                secondbutton[0],
                thirdbutton[0],
                fourthbutton[0],
              ],
            },
            {
              new: true,
              upsert: true,
            }
          );

          const button = new ActionRowBuilder().setComponents(
            new ButtonBuilder()
              .setCustomId(firstbutton[0])
              .setLabel(firstbutton[0])
              .setStyle(ButtonStyle.Danger)
              .setEmoji(emoji1),
            new ButtonBuilder()
              .setCustomId(secondbutton[0])
              .setLabel(secondbutton[0])
              .setStyle(ButtonStyle.Secondary)
              .setEmoji(emoji2),
            new ButtonBuilder()
              .setCustomId(thirdbutton[0])
              .setLabel(thirdbutton[0])
              .setStyle(ButtonStyle.Primary)
              .setEmoji(emoji3),
            new ButtonBuilder()
              .setCustomId(fourthbutton[0])
              .setLabel(fourthbutton[0])
              .setStyle(ButtonStyle.Success)
              .setEmoji(emoji4)
          );

          const embed = new EmbedBuilder()
            .setTitle("Ticket Support is here!")
            .setDescription(description)
            .setColor("#36CE36");

          await guild.channels.cache.get(channel.id).send({
            embeds: [embed],
            components: [button],
          });

          interaction.reply({
            content: "Ticket message has been sent.",
            ephemeral: true,
          });
        } catch (err) {
          console.log(err);
          const errEmbed = new EmbedBuilder()
            .setColor("#CE3636")
            .setDescription("Something went wrong...");

          return interaction.reply({ embeds: [errEmbed], ephemeral: true });
        }
      }
    }
  },
};
