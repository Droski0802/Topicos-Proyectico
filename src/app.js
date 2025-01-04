const express = require("express"); 
const app = express(); 
const path = require("path"); 
const jokeRoutes = require("./routes/jokeRoutes.js"); 
const swaggerUI = require("swagger-ui-express");
const specs = require("../swagger/swagger");

// Middleware
app.use(express.json()); 
app.use(express.static(path.join(__dirname, "public"))); 

// Ruta para el html de bienvenida
app.get("/", (req, res) => { 
  res.sendFile(path.join(__dirname, "public", "welcome.html")); 
}); 

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// Rutas para chistes
app.use("/joke", jokeRoutes); 

// Ruta para el html de chistes
app.get("/joke", (req, res) => { 
  res.sendFile(path.join(__dirname, "public", "joke.html")); 
}); 

// Exportamos la APP
module.exports = app; 
