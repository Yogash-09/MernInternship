// models/Vote.js
const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  pollId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poll',
    required: true
  },
  optionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Option',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  votedAt: {
    type: Date,
    default: Date.now
  }
});

voteSchema.index({ userId: 1, pollId: 1 }, { unique: true });

module.exports = mongoose.model('Vote', voteSchema);