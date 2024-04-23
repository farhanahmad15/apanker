const {model, Schema} = require('mongoose');

let verifySchema = new Schema({
    Guild: String,
    Role: String,
    Unverified: String,
    Channel: String
});

module.exports = model("Verify", verifySchema);