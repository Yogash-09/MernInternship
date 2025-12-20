// routes/optionRoutes.js
const express = require('express');
const { addOption, getOptions, updateOption, deleteOption } = require('../controllers/optionController');

const router = express.Router();

router.post('/', addOption);
router.get('/:pollId', getOptions);
router.put('/:optionId', updateOption);
router.delete('/:optionId', deleteOption);

module.exports = router;