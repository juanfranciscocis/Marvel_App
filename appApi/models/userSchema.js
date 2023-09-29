
const mongoose = require('mongoose');

const usuariosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    nombreUsuario: {
        type: String,
        required: true,
        unique: true
    },
    telefono: {
        type: String,
        required: true,
        unique: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    contrasena: {
        type: String,
        required: true
    },
    imagen: {
        data: Buffer,
        contentType: String,
    }
});

new mongoose.model('user', usuariosSchema); //nombre del modelo, esquema, nombre de la coleccion
// const user = new Usuario({
//     nombre: 'Juan',
//     apellido: 'Cisneros Guzman',
//     nombreUsuario: 'juanfrancistm2011',
//     telefono: '939683251',
//     correo: 'juanfrancistm2011@icloud.com',
//     contrasena: '06012002jF_',
// });
//
// mongoose.connection.on('connected', () => {
//     user.save();
// });
