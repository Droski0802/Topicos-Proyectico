const express = require("express"); 
const app = express(); 
const path = require("path"); 
const jokeRoutes = require("./routes/jokeRoutes"); 

app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); 

app.get("/", (req, res) => { 
  res.sendFile(path.join(__dirname, "public", "welcome.html")); 
});

app.use("/joke", jokeRoutes); 

app.get("/joke", (req, res) => { 
  res.sendFile(path.join(__dirname, "public", "joke.html")); 
}); 

module.exports = app;
