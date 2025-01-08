const axios = require("axios"); 
const Joke = require("../models/joke"); 
const mongoose = require("mongoose"); 

// Obtener el chiste segun el tipo
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

// Crear el chiste propio
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

//Modificar Chiste
const updateJoke = async (req, res) => {
  const { id } = req.params;  // Obtener el ID de los parámetros de la URL
  const { text, author, score, category } = req.body;  // Obtener los nuevos datos del chiste del cuerpo de la solicitud
  console.log("LLego: "+text+author+category);
  try {
    // Buscar y actualizar el chiste por su ID
    const joke = await Joke.findByIdAndUpdate(
      id,  // ID del chiste que se va a modificar
      { text, author, score, category },  // Nuevos datos para actualizar
      { new: true, runValidators: true }  // Opciones: retornar el documento actualizado y ejecutar validadores
    );

    if (!joke) {
      // Si el chiste no se encuentra, devolver un error 404
      return res.status(404).json({ error: "Chiste no encontrado" });
    }

    // Devolver el chiste actualizado
    res.status(200).json(joke);
  } catch (error) {
    // Manejo de errores
    return res.status(400).json({ error: error.message });
  }
};

//Borrar Chiste
const deleteJoke = async (req, res) => {
  const { id } = req.params;  // Obtener el ID de los parámetros de la URL

  try {
    // Buscar y eliminar el chiste por su ID
    const joke = await Joke.findByIdAndDelete(id);

    if (!joke) {
      // Si el chiste no se encuentra, devolver un error 404
      return res.status(404).json({ error: "Chiste no encontrado" });
    }

    // Devolver un mensaje de éxito
    res.status(200).json({ message: "Chiste eliminado con éxito" });
  } catch (error) {
    // Manejo de errores
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
    res.status(200).json(joke);
  } catch (error) {
    console.error("Error al buscar el chiste", error);
    res.status(500).json({ message: "Error al buscar el chiste" });
  }
};

// Cantidad de chistes por categoria
const JokesByCategory = async (req, res) => {
  const { category } = req.params;
  //validamos la categoria
  if (
    category != "Dad joke" &&
    category != "Humor Negro" &&
    category != "Chistoso" &&
    category != "Malo"
  ) {
    return res.status(400).json({ error: "La categoria no existe" });
  }

  try {
    //Buscamos la cantidad de chistes por categoria en MongoDB
    const count = await Joke.countDocuments({ category: category });
    //Si no existe ningun chiste en esa categoria
    if (count === 0) {
      return res.status(404).json({
        message: `No se encontraron chistes en la categoría ${category}`,
      });
    }
    // Si encuentra la categoria y la cantidad

    res.status(200).json({ category: category, count: count });
  } catch (error) {
    console.error("Error al obtener la cantidad de chistes", error);
    res
      .status(500)
      .json({ message: "Error al obtener la cantidad de chistes" });
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
module.exports = {
  getJoke,
  createJoke,
  searchJokeByID,
  getJokesByScore,
  JokesByCategory,
  updateJoke,
  deleteJoke,
};
