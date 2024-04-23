const { Client, ActivityType } = require("discord.js");
const mongoose = require("mongoose");
const config = require("../../config");
const Levels = require("discord.js-leveling");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    mongoose.set("strictQuery", false);
    await mongoose.connect(config.mongodb || "", {});

    if (mongoose.connect) {
      console.log("MongoDB connection succesful.");
    }

    Levels.setURL(config.mongodb);
    client.user.setActivity("fomesserver.web.app | /help", {
      type: ActivityType.Watching,
    });
    console.log(`${client.user.username} is now online.`);
  },
};
