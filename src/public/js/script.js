document.addEventListener("DOMContentLoaded", () => { 
  const apiUrl = "http://localhost:3000"; 

  // Obtener un chiste 
  document 
    .getElementById("getJokeButton") 
    .addEventListener("click", async () => { 
      const jokeType = document.getElementById("jokeType").value; 
      const resultElement = document.getElementById("jokeResult"); 
      // Hace un llamado a la API para obtener el chiste especifico 
      try { 
        const response = await fetch(`${apiUrl}/joke/${jokeType}`); 
        if (!response.ok) { 
          throw new Error("Error al obtener el chiste"); 
        } 
        const data = await response.json(); 
        // Aqui se verifica si es un objeto o nulo (Para saber cual de los 3 tipos de chistes es) 
        if (typeof data === "object" && data !== null) { 
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
  document 
    .getElementById("addJokeForm") 
    .addEventListener("submit", async (e) => { 
      e.preventDefault(); 
 
      const jokeText = document.getElementById("jokeText").value; 
      const jokeAuthor = 
        document.getElementById("jokeAuthor").value || undefined; 
      const jokeScore = parseInt(document.getElementById("jokeScore").value); 
      const jokeCategory = document.getElementById("jokeCategory").value; 
      const resultElement = document.getElementById("addJokeResult"); 
 
      // Hace un llamado a la api para agregar el chiste pasandole los parametros 
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
        resultElement.textContent = `ID: ${data.id}. Chiste agregado con éxito!`; 
        // Limpiar formulario 
        document.getElementById("addJokeForm").reset(); 
      } catch (error) { 
        resultElement.textContent = error.message; 
      } 
    });

    //Modificar Chiste
  document.getElementById("updateJokeForm").addEventListener("submit", async (e) =>{
    e.preventDefault();
    let jokeId = document.getElementById("uJokeIdInput").value.trim(); 
    const updatedJoke = { 
      text: document.getElementById("ujokeText").value.trim(), 
      author: document.getElementById("ujokeAuthor").value.trim(), 
      score: parseInt(document.getElementById("ujokeScore").value, 10), 
      category: document.getElementById("ujokeCategory").value.trim(), };

    try { 
      const response = await fetch(`${apiUrl}/joke/update/${jokeId}`, 
      { method: 'PUT', headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(updatedJoke) }); 
      const responseData = await response.json(); 
      // Si ocurre algun error lo muestra 
      if (!response.ok) { 
        document.getElementById("updateJokeResult").textContent = `${ responseData.message || "Error al actualizar el chiste" }`; 
        return; 
      } 
      // Si la actualización es exitosa 
      document.getElementById("updateJokeResult").textContent = "Chiste actualizado con éxito!";
      document.getElementById("updateJokeForm").hidden = true; 
    } catch (error) { 
    // En caso de existir algún problema con la llamada fetch indica el error 
    document.getElementById("updateJokeResult").textContent = error.message; 
    }

  });

  //Eliminar Chiste

  document.getElementById("deleteJokeButton").addEventListener("click", async (e) => {
    e.preventDefault();  // Prevenir el comportamiento por defecto del botón
    let jokeId = document.getElementById("jokeIdDelete").value.trim();
    const deleteJokeResult = document.getElementById("deleteResult");
  
    try {
      // Hace un llamado a la API para borrar el chiste por su ID
      const response = await fetch(`${apiUrl}/joke/delete/${jokeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // Verificar si el contenido de la respuesta es JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const responseData = await response.json();
        // Si ocurre algún error, mostrarlo
        if (!response.ok) {
          deleteJokeResult.textContent = `${
            responseData.message || "Error al eliminar el chiste"
          }`;
          return;
        }
        // Si la eliminación es exitosa
        deleteJokeResult.textContent = "Chiste eliminado con éxito!";
      } else {
        // Si la respuesta no es JSON, mostrar el contenido como texto
        const responseText = await response.text();
        console.log("Respuesta no JSON:", responseText);
        deleteJokeResult.textContent = "Error: La respuesta no está en formato JSON.";
      }
    } catch (error) {
      // En caso de existir algún problema con la llamada fetch indica el error
      deleteJokeResult.textContent = error.message;
    }
  });
  

  //Buscar chiste por ID antes de modificarlo
  document 
    .getElementById("uSearchByIdForm") 
    .addEventListener("submit", async (e) => { 
      e.preventDefault(); 
      let jokeId = document.getElementById("uJokeIdInput").value.trim();
      const jokeSearchIdResult = document.getElementById("uJokeSearchIdResult");

      try {
        // Hace un llamado a la API para buscar el chiste por su ID
        const response = await fetch(`${apiUrl}/joke/search/${jokeId}`);
        const responseData = await response.json();
        // Si ocurre algun error lo muestra
        if (!response.ok) {
          jokeSearchIdResult.textContent = `${
            responseData.message || "Error al buscar el chiste"
          }`;
          return;
        }

        //Rellena el formulario con los datos anteriores
        document.getElementById("ujokeText").value = responseData.text;
        document.getElementById("ujokeAuthor").value = responseData.author;
        document.getElementById("ujokeScore").value = responseData.score;
        document.getElementById("ujokeCategory").value = responseData.category;
        //Muestra el formulario de modificacion
        document.getElementById('updateJokeForm').hidden = false;
      } catch (error) {
        // En caso de existir algun problema con la llamada fetch indica el error
        jokeSearchIdResult.textContent = error.message;
      }
      
    });
  
  // Buscar un chiste por su id
  document
    .getElementById("searchByIdForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      // Extrae el id colocado por el usuario
      let jokeId = document.getElementById("jokeIdInput").value.trim();
      const jokeSearchIdResult = document.getElementById("jokeSearchIdResult");

      try {
        // Hace un llamado a la API para buscar el chiste por su ID
        const response = await fetch(`${apiUrl}/joke/search/${jokeId}`);
        const responseData = await response.json();
        // Si ocurre algun error lo muestra
        if (!response.ok) {
          jokeSearchIdResult.textContent = `${
            responseData.message || "Error al buscar el chiste"
          }`;
          return;
        }
        // Si el chiste existe lo muestra al usuario
        jokeSearchIdResult.textContent = responseData.text;
        // Limpiar formulario
        document.getElementById("searchByIdForm").reset();
      } catch (error) {
        // En caso de existir algun problema con la llamada fetch indica el error
        jokeSearchIdResult.textContent = error.message;
      }
    });
    
  //Buscar cantidad de chistes por categoria
  document
    .getElementById("quantifyCategoryForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      //extrae la categoria seleccionada
      const jokeCategory = document.getElementById("jokeCategorySearch").value;
      try {
        // Hace un llamado a la API para buscar los chistes por categoria
        const response = await fetch(`${apiUrl}/joke/category/${jokeCategory}`);
        const responseData = await response.json();
        // Si ocurre algun error lo muestra
        if (!response.ok) {
          numberResult.textContent = `${
            responseData.message || "Error al buscar los chistes"
          }`;
          return;
        }
        // Si el encuentra la cantidad de chistes los muestra al usuario
        numberResult.textContent = `Categoría: ${responseData.category}, Cantidad de chistes: ${responseData.count}`;
      } catch (error) {
        // En caso de existir algun problema con la llamada fetch indica el error
        jokeSearchIdResult.textContent = error.message;
      }
    });

  // Buscar chistes por su puntaje 
  document 
    .getElementById("searchButton") 
    .addEventListener("click", async () => { 
      const score = document.getElementById("score").value; 
      const errorDiv = document.getElementById("error"); 
      const table = document.getElementById("jokesTable"); 
      const tbody = table.querySelector("tbody"); 
 
      // Limpiar mensajes previos y la tabla 
      errorDiv.style.display = "none"; 
      table.classList.add("hidden"); 
      tbody.innerHTML = ""; 
 
      if (!score) {
        errorDiv.textContent = "Por favor, ingrese un puntaje."; 
        errorDiv.style.display = "block"; 
        return; 
      } 
 
      try { 
        const response = await fetch(`${apiUrl}/joke/score/${score}`); 
        if (!response.ok) { 
          throw new Error( 
            "No se encontraron chistes para el puntaje especificado." 
          ); 
        } 

        const jokes = await response.json(); 
 
        jokes.forEach((joke) => { 
          const row = document.createElement("tr"); 
          row.innerHTML = ` 
                <td>${joke._id}</td>  
                <td>${joke.text}</td> 
                <td>${joke.author || "Anónimo"}</td> 
                <td>${joke.score}</td> 
                <td>${joke.category}</td> 
            `; 
          tbody.appendChild(row); 
        }); 
 
        table.classList.remove("hidden"); 
      } catch (error) { 
        errorDiv.textContent = error.message; 
        errorDiv.style.display = "block"; 
      } 
    }); 
}); 
