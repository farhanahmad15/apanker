const {model, Schema} = require('mongoose');

let muteSchema = new Schema({
    Guild: String,
    Role: String,
});

module.exports = model("Mute", muteSchema);