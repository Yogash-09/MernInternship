// controllers/optionController.js
const Option = require('../models/Option');
const Poll = require('../models/Poll');
const User = require('../models/User');

const addOption = async (req, res) => {
  try {
    const { pollId, text, userId } = req.body;

    const user = await User.findById(userId);
    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Only admins can add options' });
    }

    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }

    const option = new Option({
      pollId,
      text
    });

    await option.save();

    res.status(201).json({
      message: 'Option added successfully',
      option
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getOptions = async (req, res) => {
  try {
    const { pollId } = req.params;

    const options = await Option.find({ pollId });

    res.json({ options });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateOption = async (req, res) => {
  try {
    const { optionId } = req.params;
    const { text, userId } = req.body;

    const user = await User.findById(userId);
    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Only admins can update options' });
    }

    const option = await Option.findByIdAndUpdate(
      optionId,
      { text },
      { new: true }
    );

    if (!option) {
      return res.status(404).json({ message: 'Option not found' });
    }

    res.json({
      message: 'Option updated successfully',
      option
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteOption = async (req, res) => {
  try {
    const { optionId } = req.params;
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Only admins can delete options' });
    }

    const option = await Option.findByIdAndDelete(optionId);

    if (!option) {
      return res.status(404).json({ message: 'Option not found' });
    }

    res.json({ message: 'Option deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  addOption,
  getOptions,
  updateOption,
  deleteOption
};