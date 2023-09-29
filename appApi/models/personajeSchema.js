
const mongoose = require('mongoose');

const personaje_likeSchema = new mongoose.Schema({
    idPersonaje: {
        type: [String], //array de strings
        required: true
    },
    idUsuario: {
        type: String,
        required: true,
        unique: true
    }
});

new mongoose.model('personaje_like', personaje_likeSchema); //nombre del modelo, esquema, nombre de la coleccion

