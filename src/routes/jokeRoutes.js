const express = require('express');
const { getJoke, createJoke, searchJokeByID, getJokesByScore } = require('../controllers/jokeController');

const router = express.Router();

router.get('/:type', getJoke);
router.post('/', createJoke);
router.get('/search/:id',searchJokeByID)
router.get('/score/:score', getJokesByScore);

module.exports = router;