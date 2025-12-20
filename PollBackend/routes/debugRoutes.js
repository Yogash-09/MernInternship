// routes/debugRoutes.js
const express = require('express');
const User = require('../models/User');
const Poll = require('../models/Poll');
const Option = require('../models/Option');
const Vote = require('../models/Vote');

const router = express.Router();

router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get('/polls', async (req, res) => {
  const polls = await Poll.find().populate('createdBy');
  res.json(polls);
});

router.get('/options', async (req, res) => {
  const options = await Option.find();
  res.json(options);
});

router.get('/votes', async (req, res) => {
  const votes = await Vote.find().populate('userId').populate('optionId');
  res.json(votes);
});

module.exports = router;