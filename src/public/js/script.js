const { text } = require("express");

const apiUrl = 'http://localhost:3000'; 


// Obtener un chiste
document.getElementById('getJokeButton').addEventListener('click', async () => {
  const jokeType = document.getElementById('jokeType').value;
  const resultElement = document.getElementById('jokeResult');
  // Hace un llamado a la API para obtener el chiste especifico
  try {
    const response = await fetch(`${apiUrl}/joke/${jokeType}`);
    if (!response.ok){
      throw new Error('Error al obtener el chiste');
    }
    const data = await response.json();
    // Aqui se verifica si es un objeto o nulo (Para saber cual de los 3 tipos de chistes es)
    if (typeof data === 'object' && data !== null) {
      resultElement.textContent = 
        data.joke || data.message || JSON.stringify(data);
    } else {
      resultElement.textconte = data;
    }
  } catch (error) {
    // Muestra un error si hay algun tipo de problema con la llamada fetch
    resultElement.textContent = error.message;
  }
});


// Agregar un chiste
document.getElementById('addJokeForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const jokeText = document.getElementById('jokeText').value;
  const jokeAuthor = document.getElementById('jokeAuthor').value || undefined;
  const jokeScore = parseInt(document.getElementById('jokeScore').value);
  const jokeCategory = document.getElementById('jokeCategory').value;
  const resultElement = document.getElementById('addJokeResult');

  // Hace un llamado a la api para agregar el chiste pasandole los parametros
  try {
    const response = await fetch(`${apiUrl}/joke`, {
      method: 'POST',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        text: jokeText,
        author: jokeAuthor,
        score: jokeScore,
        category: jokeCategory,
      }),
    }); 
    // Lanza error si no pudo agregar el chiste
    if (!response.ok){
      throw new Error('Error al agregar el chiste');
    }
    const data = await response.json();
    // El chiste fue agregado con exito
    resultElement.textContent = `Chiste agregado con ID: ${data.id}`;
  } catch (error){
    // Mensaje de error si tuvo algun problema con el llamado a la API
    resultElement.textContent = error.message;
  }
});

//Buscar un chiste por su id
document
  .getElementById("searchByIdForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    let jokeId = document.getElementById("jokeIdInput").value.trim();
    jokeSearchIdResult.textContent = jokeId;
    try {
      const response = await fetch(`${apiUrl}/joke/search/${jokeId}`);
      if (!response.ok) {
        jokeSearchIdResult.textContent = response.json;
      }
      const jokeData = await response.json();
      jokeSearchIdResult.textContent = jokeData.text;
    } catch (error) {
      jokeSearchIdResult.textContent = "ERROR: " + error.message;
    }
  });
