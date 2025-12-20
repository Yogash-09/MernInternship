// routes/voteRoutes.js
const express = require('express');
const { castVote, getUserVote } = require('../controllers/voteController');

const router = express.Router();

router.post('/', castVote);
router.get('/:pollId/:userId', getUserVote);

module.exports = router;