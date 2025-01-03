document.addEventListener('DOMContentLoaded', () => {
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
        resultElement.textContent = data;
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
          category: jokeCategory
        })
      });
      if (!response.ok) {
        throw new Error('Error al agregar el chiste');
      }
      const data = await response.json();
      resultElement.textContent = 'Chiste agregado con éxito!';
    } catch (error) {
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

  // Buscar chistes por su puntaje
  document.getElementById('searchButton').addEventListener('click', async () => {
    const score = document.getElementById('score').value;
    const errorDiv = document.getElementById('error');
    const table = document.getElementById('jokesTable');
    const tbody = table.querySelector('tbody');

    // Limpiar mensajes previos y la tabla
    errorDiv.style.display = 'none';
    table.classList.add('hidden');
    tbody.innerHTML = '';

    if (!score) {
        errorDiv.textContent = 'Por favor, ingrese un puntaje.';
        errorDiv.style.display = 'block';
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/joke/score/${score}`);
        if (!response.ok) {
            throw new Error('No se encontraron chistes para el puntaje especificado.');
        }

        const jokes = await response.json();

        jokes.forEach((joke) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${joke.text}</td>
                <td>${joke.author || 'Anónimo'}</td>
                <td>${joke.score}</td>
                <td>${joke.category}</td>
            `;
            tbody.appendChild(row);
        });

        table.classList.remove('hidden');
    } catch (error) {
        errorDiv.textContent = error.message;
        errorDiv.style.display = 'block';
    }
})
});

