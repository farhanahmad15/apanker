const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const Ticket = require("../../Models/Ticket");
const { Red, Blue, Green, Yellow } = require("../../colors");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Ticket actions")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName("action")
        .setDescription("Add or remove members from the ticket.")
        .setRequired(true)
        .addChoices(
          { name: "Add", value: "add" },
          { name: "Remove", value: "remove" }
        )
    )
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription(
          "Select a member from the discord server to perform the action on."
        )
        .setRequired(true)
    ),

  async execute(interaction) {
    const { guildId, options, channel } = interaction;

    const action = options.getString("action");
    const member = options.getUser("member");

    const embed = new EmbedBuilder();

    switch (action) {
      case "add":
        try {
          const data = await Ticket.findOne({
            GuildID: guildId,
            ChannelID: channel.id,
          });

          if (!data) {
            return interaction.reply({
              embeds: [
                embed
                  .setColor(Red)
                  .setDescription("Something went wrong. Try again later."),
              ],
              ephemeral: true,
            });
          }

          if (data.MembersID.includes(member.id)) {
            return interaction.reply({
              embeds: [
                embed
                  .setColor(Red)
                  .setDescription("It looks like the User already has a ticket."),
              ],
              ephemeral: true,
            });
          }

          data.MembersID.push(member.id);

          await channel.permissionOverwrites.edit(member.id, {
            SendMessages: true,
            ViewChannel: true,
            ReadMessageHistory: true,
          });

          await interaction.reply({
            embeds: [
              embed
                .setColor(Green)
                .setDescription(`${member} has been added to the ticket.`),
            ],
          });

          await data.save();
        } catch (err) {
          console.error(err);
          interaction.reply({
            embeds: [
              embed
                .setColor(Red)
                .setDescription(
                  "An error occurred while processing your request."
                ),
            ],
            ephemeral: true,
          });
        }
        break;
      case "remove":
        try {
          // Find the ticket data
          const data = await Ticket.findOne({
            GuildID: guildId,
            ChannelID: channel.id,
          });

          // If no data is found, reply with an error
          if (!data) {
            return interaction.reply({
              embeds: [
                embed
                  .setColor(Red)
                  .setDescription("Something went wrong. Try again later."),
              ],
              ephemeral: true,
            });
          }

          // Check if the member is not in the ticket
          if (!data.MembersID.includes(member.id)) {
            return interaction.reply({
              embeds: [
                embed
                  .setColor(Red)
                  .setDescription("It looks like the User doesn't have a ticket."),
              ],
              ephemeral: true,
            });
          }

          // Remove the member from the ticket
          data.MembersID.pull(member.id); // Use `pull` instead of `remove` for Mongoose arrays

          // Update channel permissions for the member
          await channel.permissionOverwrites.edit(member.id, {
            SendMessages: false,
            ViewChannel: false,
            ReadMessageHistory: false,
          });

          // Reply to the interaction
          await interaction.reply({
            embeds: [
              embed
                .setColor(Green)
                .setDescription(`${member} has been removed from the ticket.`),
            ],
          });

          // Save the updated data
          await data.save();
        } catch (err) {
          console.error(err); // Log the error for debugging
          interaction.reply({
            embeds: [
              embed
                .setColor(Red)
                .setDescription(
                  "An error occurred while processing your request."
                ),
            ],
            ephemeral: true,
          });
        }
        break;
    }
  },
};
