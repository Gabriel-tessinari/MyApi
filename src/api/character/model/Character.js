const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    userId: Number,
    name: String,
    race: String,
    class: String,
    level: Number,
    exp: Number,
    background: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Character', characterSchema);