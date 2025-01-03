const express = require('express');
const { getJoke, createJoke, searchJokeByID } = require('../controllers/jokeController');

const router = express.Router();

router.get('/:type', getJoke);
router.post('/', createJoke);
router.get('/search/:id',searchJokeByID)

module.exports = router;