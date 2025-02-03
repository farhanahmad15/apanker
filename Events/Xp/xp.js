
const {EmbedBuilder} = require('discord.js')
const Levels = require('discord.js-leveling');
const Schema = require('../../Models/Leveling');

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: String,
  guildId: String,
  timestamp: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

let lock = false;
let user;

module.exports = {
  name: 'messageCreate',

  async execute(message) {
    if(!message.guild) return
    const data = await Schema.findOne({ Guild: message?.guild.id });
    if (!data) return console.log("No data");
    let levelingChannel = data.Channel;

    if (!message.guild) return;
    if (message.author.bot) return;

    // Find the user in the database or create a new entry for them if they don't exist
    user = await User.findOne({
      userId: message.author.id,
      guildId: message.guild.id,
    });
    if (!user) {
      user = new User({ userId: message.author.id, guildId: message.guild.id });
      await user.save();
    }

    // Check if the time elapsed is greater than 60 seconds since the user's last message
    if (Date.now() - user.timestamp > 60000) {
      const min = 15;
      const max = 30;
      const randomAmountOfXp =
        Math.floor(Math.random() * (max - min + 1)) + min;
      const hasLeveledUp = await Levels.appendXp(
        message.author.id,
        message.guild.id,
        randomAmountOfXp
      );
      if (hasLeveledUp) {
        const userData = await Levels.fetch(
          message.author.id,
          message.guild.id
        );
        const sendEmbed = await message.guild.channels.cache
          .get(levelingChannel)
          .send(
            `**GG** ${message.author}, you just leveled up to level **${
              userData.level + 1
            }**!`
          );
        await sendEmbed.react("🥳");
      }
      // Update the timestamp to the current time to track the user's last message
      user.timestamp = Date.now();
    }

    // Save the updated user object to the database
    if (lock) return; // If the lock is already set, exit the function early
    lock = true; // Set the lock to prevent multiple saves
    await user.save().catch((err) => {
      console.error(err); // Log any errors to the console
    });
    lock = false;
  },
};

