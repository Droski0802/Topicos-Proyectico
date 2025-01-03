const apiUrl = "http://localhost:3000"; // Cambia esto si tu servidor tiene otra URL

// Obtener un chiste
document.getElementById("getJokeButton").addEventListener("click", async () => {
  const jokeType = document.getElementById("jokeType").value;
  const resultElement = document.getElementById("jokeResult");

  try {
    const response = await fetch(`${apiUrl}/joke/${jokeType}`);
    if (!response.ok) {
      throw new Error("Error al obtener el chiste");
    }
    const data = await response.json();
    if (typeof data === "object" && data !== null) {
      resultElement.textContent =
        data.joke || data.message || JSON.stringify(data);
    } else {
      resultElement.textContent = data;
    }
  } catch (error) {
    resultElement.textContent = error.message;
  }
});

// Agregar un chiste
document.getElementById("addJokeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const jokeText = document.getElementById("jokeText").value;
  const jokeAuthor = document.getElementById("jokeAuthor").value || undefined;
  const jokeScore = parseInt(document.getElementById("jokeScore").value);
  const jokeCategory = document.getElementById("jokeCategory").value;
  const resultElement = document.getElementById("addJokeResult");

  try {
    const response = await fetch(`${apiUrl}/joke`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: jokeText,
        author: jokeAuthor,
        score: jokeScore,
        category: jokeCategory,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al agregar el chiste");
    }

    const data = await response.json();
    resultElement.textContent = `Chiste agregado con ID: ${data.id}`;
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
