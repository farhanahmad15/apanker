const {
  ButtonInteraction,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const { Red, Blue, Green, Yellow } = require("../../colors");

const { createTranscript } = require("discord-html-transcripts");
const TicketSetup = require("../../Models/TicketSetup");
const ticketSchema = require("../../Models/Ticket");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    const { guild, member, customId, channel } = interaction;
    const { ManageChannels, SendMessages } = PermissionFlagsBits;
    if (!interaction.isButton()) return;
    if (!["close", "lock", "unlock", "claim"].includes(customId)) return;
    const docs = await TicketSetup.findOne({ GuildID: guild.id });
    if (!docs) return;

    if (!guild.members.me.permissions.has((r) => r.id === docs.Handlers)) {
      interaction.reply({
        content: "I don't have permissions for this",
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder().setColor("#0099FF");

    try {
      const data = ticketSchema.findOne({ ChannelID: channel.id });

      if (!data) return;

      const fetchedMember = await guild.members.cache.get(data.MemberID);

      switch (customId) {
        case "close":
          if (data.closed == true)
            return interaction.reply({
              content: "Ticket is already getting deleted...",
              ephemeral: true,
            });

          const transcript = await createTranscript(channel, {
            limit: -1,
            returnBuffer: false,
            fileName: `${member.user.username}-ticket${data.Type}-${data.TicketID}.html`,
          });
          await ticketSchema.updateOne(
            { ChannelID: channel.id },
            { Closed: true }
          );
          const deleted = await ticketSchema.deleteOne({
            GuildID: guild.id,
            MemberID: member.id,
          });
          if (deleted.deletedCount === 0) {
            console.log("Ticket not found");
          } else {
            console.log("Ticket deleted successfully");
          }

          const transcriptEmbed = new EmbedBuilder()
            .setTitle(`Transcript Type: ${data.Type}\nID: ${data.TicketID} `)
            .setFooter({
              text: member.user.username,
              iconURL: member.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp();

          const transcriptProcess = new EmbedBuilder()
            .setTitle("Saving transcript...")
            .setDescription(
              "Ticket will be closed in 10 seconds, enable DMS for the ticket transcript"
            )
            .setColor("#CE3636")
            .setFooter({
              text: member.user.username,
              iconURL: member.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp();

          const res = await guild.channels.cache.get(docs.Transcripts).send({
            embeds: [transcriptEmbed],
            files: [transcript],
          });

          channel.send({ embeds: [transcriptProcess] });

          setTimeout(function () {
            member
              .send({
                embeds: [
                  transcriptEmbed
                    .setDescription(
                      `Access your ticket transcript, copy this html and run this html code in a text editor or `
                    )
                    .addFields({
                      name: "Here",
                      value:
                        "https://www.w3schools.com/html/tryit.asp?filename=tryhtml_intro",
                    }),
                ],
                files: [transcript],
              })
              .catch(() => channel.send(`Couldn't send transcript to DMS `));
            channel.delete();
          }, 10000);
          break;

        case "lock":
          if (!member.permissions.has(ManageChannels))
            return interaction.reply({
              content: `You do not have permissions for that`,
              ephemeral: true,
            });

          if (data.Locked == true)
            return interaction.reply({
              content: "Ticket is already locked",
              ephemeral: true,
            });

          await ticketSchema.updateOne(
            { ChannelID: channel.id },
            { Locked: true }
          );
          embed.setDescription("Ticket was locked successfully");

          // data.MemberID.forEach((m) =>{
          //     channel.permissionOverwrites.edit(m, {SendMessages: false})

          // })

          channel.permissionOverwrites.edit(data.MemberID, {
            SendMessages: false,
          });

          return interaction.reply({ embeds: [embed] });

        case "unlock":
          if (!member.permissions.has(ManageChannels))
            return interaction.reply({
              content: `You do not have permissions for that`,
              ephemeral: true,
            });

          if (data.Locked == false)
            return interaction.reply({
              content: "Ticket is already unlocked",
              ephemeral: true,
            });

          await ticketSchema.updateOne(
            { ChannelID: channel.id },
            { Locked: false }
          );
          embed.setDescription("Ticket was unlocked successfully");

          // data.MemberID.forEach((m) =>{
          //     channel.permissionOverwrites.edit(m, {SendMessages: false})

          // })

          channel.permissionOverwrites.edit(data.MemberID, {
            SendMessages: true,
          });

          return interaction.reply({ embeds: [embed] });

        case "claim":
          if (!member.permissions.has(ManageChannels))
            return interaction.reply({
              content: `You do not have permissions for that`,
              ephemeral: true,
            });

          if (data.Claimed == true)
            return interaction.reply({
              content: `Ticket is already claimed by <@${data.ClaimedBy}>`,
              ephemeral: true,
            });

          await ticketSchema.updateOne(
            { ChannelID: channel.id },
            { Claimed: true, ClaimedBy: member.id }
          );

          embed.setDescription(`Ticket was successfully claimed by ${member}`);

          interaction.reply({ embeds: [embed] });
          break;
      }
    } catch (err) {
      console.log(err);
    }
  },
};
