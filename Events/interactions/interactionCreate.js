const {
  CommandInteraction,
  ActionRowBuilder,
  Events,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  EmbedBuilder,
  ButtonStyle,
  ButtonBuilder,
} = require("discord.js");
const Schema = require("../../Models/Verify");
const suggestSchema = require("../../Models/Suggestion");
const { Red, Blue, Green, Yellow } = require("../../colors");

const usercontext = require("../../Commands/Moderation/changenickcontext");

function makeid(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
const verifyMessage = makeid(5);

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (interaction.commandName === "setup-verify") {
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
      } else if (!command) {
        interaction.reply({ content: "outdated command" });
      }
      command.execute(interaction, client);
    } else if (interaction.isUserContextMenuCommand()) {
      const command = client.commands.get(interaction.commandName);
      command.execute(interaction, client);
    } else if (interaction.isButton()) {
      const { customId } = interaction;
      if (customId === "approve") {
        suggestSchema.findOne(
          { Guild: interaction.guild.id },
          async (err, data) => {
            if (!data) return;
            let suggestionChannel = data.suggestionChannel;

            const embedString = JSON.stringify(interaction.message.embeds);

            const embeds = JSON.parse(embedString).map(
              (embedData) => new EmbedBuilder(embedData)
            );

            await interaction.guild.channels.cache
              .get(suggestionChannel)
              .send({
                embeds: embeds,
              })
              .then((s) => {
                s.react("✅");
                s.react("❌");
              })
              .catch((err) => {
                throw err;
              });

            await interaction.component.setLabel("Approved");

            // Send the embeds to the channel
            await interaction.reply({
              content: ":white_check_mark: | Suggestion successfully sent.",
              ephemeral: true,
            });
          }
        );
      }

      if (customId === "verify") {
        const modal = new ModalBuilder()
          .setCustomId("verifymodal")
          .setTitle(`Verification Required`);

        const verifyInput = new TextInputBuilder()
          .setCustomId("verifyInput")
          .setLabel(`Type "${verifyMessage}" to verify`)
          .setStyle(TextInputStyle.Short);

        const firstActionRow = new ActionRowBuilder().addComponents(
          verifyInput
        );
        modal.addComponents(firstActionRow);
        await interaction.showModal(modal).catch(() => {});
      } else if (customId === "nickname") {
      }
    } else if (interaction.isModalSubmit()) {
      if (interaction.customId === "verifymodal") {
        const verifymodal = interaction.fields.getTextInputValue("verifyInput");

        if (verifymodal === verifyMessage) {
          Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (!data)
              return interaction.reply({
                content: "Error please wait",
                ephemeral: true,
              });
            let Role = data.Role;
            let Unverified = data.Unverified;

            const role = await interaction.guild.roles.cache.get(Role); // verified role id
            const unv = await interaction.guild.roles.cache.get(Unverified);
            await interaction.member.roles.add(role).catch(() => {});
            await interaction.member.roles.remove(unv).catch(() => {});
            await interaction.reply({
              content: `**You have been verified**, ${role} has been assigned to you and ${unv} has been removed .`,
              ephemeral: true,
            });
          });
        } else {
          await interaction.reply({
            content:
              "Please make sure to type the correct code in the text box in all capitals/block letter",
            ephemeral: true,
          });
        }
      } else if (interaction.customId === "verifymessage") {
        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
          let channel = data.Channel;
          if (!data)
            return interaction.reply({
              content: "Error please wait",
              ephemeral: true,
            });
          const message =
            interaction.fields.getTextInputValue("verifymessageInput");

          const verifyEmbed = new EmbedBuilder()
            .setTitle(
              "Click the verify button to get verified and get access to all channels"
            )
            .setDescription(`${message}`)
            .setColor("FFAA00");

          let sendChannel = interaction.guild.channels.cache.get(channel).send({
            embeds: [verifyEmbed],
            components: [
              new ActionRowBuilder().setComponents(
                new ButtonBuilder()
                  .setCustomId("verify")
                  .setLabel("Verify")
                  .setStyle(ButtonStyle.Success)
              ),
            ],
          });
          if (!sendChannel) {
            await interaction
              .reply({
                content: "There was an error please try again",
                ephemeral: true,
              })
              .catch(() => {});
          } else {
            await interaction
              .reply({
                content: "Verification channel was succesfully set!",
                ephemeral: true,
              })
              .catch(() => {});
          }
        });
      }
    } else {
      return;
    }
  },
};
