const {model, Schema} = require('mongoose');
const moneySchema = new Schema({
    userId: String,
    balance: Number,
    name: String,
  });

module.exports = model('Money', moneySchema);