// routes/pollRoutes.js
const express = require('express');
const { createPoll, getPolls, getPollResults, updatePoll } = require('../controllers/pollController');

const router = express.Router();

router.post('/', createPoll);
router.get('/', getPolls);
router.get('/:pollId/results', getPollResults);
router.put('/:pollId', updatePoll);

module.exports = router;