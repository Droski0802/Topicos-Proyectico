const express = require('express');
const { getJoke, createJoke} = require('../controllers/jokeController');

const router = express.Router();

router.get('/:type', getJoke);
router.post('/', createJoke);

module.exports = router;