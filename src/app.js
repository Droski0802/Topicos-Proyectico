const express = require('express');
const app = express();
const jokeRoutes = require('./routes/jokeRoutes');

app.use(express.json());

app.get('/', (req,res) => {
    res.send('Bienvenido a la API de Chistes');
});

app.use('/joke', jokeRoutes);

module.exports = app;