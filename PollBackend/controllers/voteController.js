// controllers/voteController.js
const Vote = require('../models/Vote');
const Poll = require('../models/Poll');
const Option = require('../models/Option');
const User = require('../models/User');

const castVote = async (req, res) => {
  try {
    const { pollId, optionId, userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }

    const now = new Date();
    if (now < poll.startDate || now > poll.endDate) {
      return res.status(400).json({ message: 'Poll is not active' });
    }

    const existingVote = await Vote.findOne({ userId, pollId });
    if (existingVote) {
      return res.status(400).json({ message: 'You have already voted in this poll' });
    }

    const option = await Option.findById(optionId);
    if (!option || option.pollId.toString() !== pollId) {
      return res.status(404).json({ message: 'Option not found' });
    }

    const vote = new Vote({
      pollId,
      optionId,
      userId
    });

    await vote.save();

    res.status(201).json({
      message: 'Vote cast successfully',
      vote
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getUserVote = async (req, res) => {
  try {
    const { pollId, userId } = req.params;

    const vote = await Vote.findOne({ pollId, userId }).populate('optionId');

    if (!vote) {
      return res.status(404).json({ message: 'No vote found' });
    }

    res.json({ vote });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  castVote,
  getUserVote
};