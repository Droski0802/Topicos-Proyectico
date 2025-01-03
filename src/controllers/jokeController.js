const axios = require("axios");
const Joke = require("../models/joke");
const mongoose = require("mongoose");

// Obtener el chiste
const getJoke = async (req, res) => { 
  const { type } = req.params; 
  try { 
    if (type === "Chuck") { 
      const response = await axios.get( 
        "https://api.chucknorris.io/jokes/random" 
      ); 
      return res.json({ joke: response.data.value }); 
    } else if (type === "Dad") { 
      const response = await axios.get("https://icanhazdadjoke.com", { 
        headers: { Accept: "application/json" }, 
      }); 
      return res.json({ joke: response.data.joke }); 
    } else if (type === "Propio") { 
      const jokes = await Joke.find(); 
      if (!jokes.length) { 
        return res 
          .status(404) 
          .json({ message: "Aun no hay chistes, cree uno!" }); 
      } 
      return res.json({ 
        joke: jokes[Math.floor(Math.random() * jokes.length)].text, 
      }); 
    } else { 
      return res.status(400).json({ error: "Tipo invalido" }); 
    } 
  } catch (error) { 
    return res.status(500).json({ error: "Error al obtener el chiste" }); 
  } 
}; 

// Crear el chiste 
const createJoke = async (req, res) => { 
  const { text, author, score, category } = req.body; 
 
  try { 
    const joke = new Joke({ text, author, score, category }); 
    await joke.save(); 
    res.status(201).json({ id: joke._id }); 
  } catch (error) { 
    return res.status(400).json({ error: error.message }); 
  } 
}; 

// Buscar chiste por ID
const searchJokeByID = async (req, res) => {
  const { id } = req.params;
  // Se valida que el id tengo un formato valido para MongoDB
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID Invalida" });
  }

  try {
    const joke = await Joke.findById(id);

    if (!joke) {
      //Si no se consigue ningun chiste con ese id
      return res
        .status(404)
        .json({ message: "No existe ningun chiste con ese ID" });
    }
    //Devuelve el chiste en caso de existir
    return res.status(200).json(joke);
  } catch (error) {
    console.error("Error al buscar el chiste", error);
    return res.status(500).json({ message: "Error al buscar el chiste" });
  }
};

// Obtener chistes por puntaje
const getJokesByScore = async (req, res) => {
  const { score } = req.params;
  try {
    // Validamos el puntaje
    const parsedScore = parseInt(score);
    if (isNaN(parsedScore) || parsedScore < 1 || parsedScore > 10) {
      return res 
        .status(400) 
        .json({ error: "El puntaje debe estar entre 1 y 10" }); 
    } 

    // Buscamos los chistes con el puntaje
    const jokes = await Joke.find({ score: parsedScore });

    // Si no existen chistes entonces
    if (!jokes.length) {
      return res 
        .status(404) 
        .json({ message: "No se encontraron chistes con ese puntaje" }); 
    } 

    res.status(200).json(jokes);
  } catch (error) {
    console.error("Error al obtener los chistes:", error); 
    return res 
      .status(500) 
      .json({ error: "Error al obtener los chistes", details: error.message }); 
  } 
};

// Exportar funciones
module.exports = { getJoke, createJoke, searchJokeByID, getJokesByScore }; 
