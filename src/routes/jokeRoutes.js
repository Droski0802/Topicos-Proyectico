const express = require("express");
const {
  getJoke,
  createJoke,
  searchJokeByID,
  getJokesByScore,
  JokesByCategory,
} = require("../controllers/jokeController");

const router = express.Router();

router.get("/:type", getJoke);
router.get("/:type", getJoke);
router.post("/", createJoke);
router.get("/search/:id", searchJokeByID);
router.get("/score/:score", getJokesByScore);
router.get("/category/:category", JokesByCategory);

module.exports = router;
