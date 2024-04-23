const {model, Schema} = require('mongoose')

const warnSchema = new Schema({
    userId: String,
    guildId: String,
    warns: Number,
    reason: [String],
    expireAt: { type: Date, default: Date.now() + 3 * 24 * 60 * 60 * 1000  },
  });
module.exports = model("Warns", warnSchema);