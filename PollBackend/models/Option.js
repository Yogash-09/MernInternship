// models/Option.js
const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  pollId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poll',
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Option', optionSchema);