// controllers/pollController.js
const Poll = require('../models/Poll');
const User = require('../models/User');
const Vote = require('../models/Vote');
const Option = require('../models/Option');

const createPoll = async (req, res) => {
  try {
    const { title, description, startDate, endDate, createdBy } = req.body;

    const user = await User.findById(createdBy);
    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Only admins can create polls' });
    }

    const poll = new Poll({
      title,
      description,
      createdBy,
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    });

    await poll.save();

    res.status(201).json({
      message: 'Poll created successfully',
      poll
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getPolls = async (req, res) => {
  try {
    const { userId } = req.query;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let polls;
    const now = new Date();

    if (user.role === 'ADMIN') {
      polls = await Poll.find({ createdBy: userId }).populate('createdBy', 'name email');
    } else {
      polls = await Poll.find().populate('createdBy', 'name email');
    }

    const pollsWithStatus = polls.map(poll => {
      let status;
      if (now < poll.startDate) {
        status = 'UPCOMING';
      } else if (now >= poll.startDate && now <= poll.endDate) {
        status = 'ACTIVE';
      } else {
        status = 'CLOSED';
      }

      return {
        ...poll.toObject(),
        status
      };
    });

    res.json({ polls: pollsWithStatus });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getPollResults = async (req, res) => {
  try {
    const { pollId } = req.params;

    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }

    const [options, votes] = await Promise.all([
      Option.find({ pollId }),
      Vote.aggregate([
        { $match: { pollId: poll._id } },
        { $group: { _id: '$optionId', count: { $sum: 1 } } }
      ])
    ]);

    const totalVotes = votes.reduce((sum, vote) => sum + vote.count, 0);
    const voteMap = new Map(votes.map(vote => [vote._id.toString(), vote.count]));
    
    const results = options.map(option => {
      const count = voteMap.get(option._id.toString()) || 0;
      const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;

      return {
        optionId: option._id,
        text: option.text,
        count,
        percentage: Math.round(percentage * 100) / 100
      };
    });

    res.json({
      poll,
      totalVotes,
      results
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updatePoll = async (req, res) => {
  try {
    const { pollId } = req.params;
    const { title, description, startDate, endDate, userId } = req.body;

    const user = await User.findById(userId);
    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Only admins can update polls' });
    }

    const poll = await Poll.findOneAndUpdate(
      { _id: pollId, createdBy: userId },
      {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate)
      },
      { new: true }
    );

    if (!poll) {
      return res.status(404).json({ message: 'Poll not found or unauthorized' });
    }

    res.json({ message: 'Poll updated successfully', poll });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createPoll,
  getPolls,
  getPollResults,
  updatePoll
};