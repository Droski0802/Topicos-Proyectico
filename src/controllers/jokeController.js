const axios = require('axios');
const Joke = require('../models/joke');

const getJoke = async (req,res) => {
    const { type } = req.params;

    try {
        if (type === 'Chuck'){
            const response = await axios.get('https://api.chucknorris.io/jokes/random');
            return res.json({ joke: response.data.value});
        } else if (type === 'Dad'){
            const response = await axios.get('https://icanhazdadjoke.com',{
                headers: { Accept: 'application/json'}
            });
            return res.json({joke: response.data.joke});
        } else if ( type === 'Propio'){
            const jokes = await Joke.find();
            if (!jokes.length){
                return res.status(404).json({message: 'Aun no hay chistes, cree uno!'});
            }
            return res.json({joke: jokes[Math.floor(Math.random() * jokes.length)]});
        } else {
            return res.status(400).json({error: 'Tipo invalido'});
        }
    } catch (error) {
        return res.status(500).json({error: 'Error al obtener el chiste'});
    }
};

const createJoke = async (req, res) => {
    const { text, author, score, category } = req.body;

    try {
        const joke = new Joke({ text, author, score, category });
        await joke.save();
        res.status(201).json({ id: joke._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getJoke, createJoke };