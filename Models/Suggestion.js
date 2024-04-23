const {model, Schema} = require('mongoose');

let suggestionSchema = new Schema({
    Guild: String,
    checkingChannel: String,
    suggestionChannel: String,

});

module.exports = model("Suggestion", suggestionSchema);