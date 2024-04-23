const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  ButtonBuilder, ButtonStyle
} = require("discord.js");
const { Events, ModalBuilder } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("joke")
    .setDescription("Get a random joke")
    .setDMPermission(false),

  async execute(interaction, client) {
    await interaction.deferReply()
    let joke;
    fetch(
      "https://v2.jokeapi.dev/joke/Any?format=txt?blacklistFlags=nsfw,racist,sexist,explicit,religious"
    )
      .then((response) => response.json())
      .then(async (data) => {
        if (data.type === "single") {
          joke = data.joke;
        } else {
          joke = `${data.setup} ${data.delivery}`;
        }

        if (data.safe) {
          interaction.followUp({
            embeds: [
              new EmbedBuilder()
                .setColor("#FFAA00")
                .setDescription(`${joke}`)
                .setFooter({ text: data.safe ? "Type: Safe" : "Type: Unsafe" }),
            ],
          });
        } 
        else{
          interaction.deleteReply()
        }
      })
      .catch((error) => console.error(error));

  },

  
};
