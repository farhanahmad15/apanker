const {model, Schema} = require('mongoose');

let levelingSchema = new Schema({
    Guild: String,
    Channel: String,

});

module.exports = model("Leveling", levelingSchema);