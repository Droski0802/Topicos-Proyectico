const express = require("express");
const {
  getJoke,
  createJoke,
  searchJokeByID,
  getJokesByScore,
  JokesByCategory,
  updateJoke,
} = require("../controllers/jokeController");

// Definimos el router para esoecificar las rutas de los chistes
const router = express.Router();

// Definimos las rutas
router.get("/:type", getJoke); 
router.get("/:type", getJoke); 
router.post("/", createJoke); 
router.get("/search/:id", searchJokeByID);
router.get("/score/:score", getJokesByScore); 
router.get("/category/:category", JokesByCategory);
router.put("/update/:id", updateJoke);

// Exportamos las rutas
module.exports = router;
