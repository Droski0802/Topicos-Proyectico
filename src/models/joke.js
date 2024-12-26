const mongoose = require('mongoose');

const jokeSchema = new mongoose.Schema({
    text: {type: String, required: true},
    author: {type: String, default: 'Se perdio en el Avila como Led'},
    score: {type: Number, required: true, min: 1, max: 10},
    category: {
        type: String,
        required: true,
        enum: ['Dad joke', 'Humor Negro', 'Chistoso', 'Malo'],
    },
});

module.exports = mongoose.model('Joke', jokeSchema);