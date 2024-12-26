const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req,res) => {
    res.send('Bienvenido a la API de Chistes');
});

module.exports = app;