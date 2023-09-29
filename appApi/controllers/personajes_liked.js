//controllers
const { request } = require('express');
const mongoose = require('mongoose'); //incorporar mongoose a la REST API
const personaje_liked = mongoose.model('personaje_like'); //el modelo me permite interactuar con la coleccion users


//GET - Obtener todos los personajes liked por userid
const personaje_likedObtenerTodos = (req, res) => {
    //USING THE param userid search in the collection personaje_liked
    personaje_liked.find({ idUsuario: req.params.userid }).exec().then((personaje_liked) => {
        res.status(200).json(personaje_liked);
    }).catch((err) => {
        res.status(404).json(err);
    });
}

//CREAR - Crear un nuevo personaje liked
const personaje_likedCrear = (req, res) => {
    personaje_liked.create({
        idPersonaje: req.body.idPersonaje,
        idUsuario: req.body.idUsuario
    }).then((personaje_liked) => {
        res.status(201).json({
            "message": "Personaje liked created",
        });
    }).catch((err) => {
        res.status(400).json({
            "message": "Error creating personaje liked,verify the data",
        });

    });
}

//UPDATE - Actualizar un personaje liked por id (AGREGAR UN NUEVO PERSONAJE LIKED)
const personaje_likedActualizar = (req, res) => {
    res.status(200).json({ "status": "success" });
}

//DELETE - Eliminar un personaje liked por id (CUANDO EL USUARIO ELIMINA SU CUENTA SE ELIMINAN SUS LIKES)
const personaje_likedEliminar = (req, res) => {
    res.status(204).json({ "status": "success" });
}


module.exports = {
    personaje_likedObtenerTodos, //GET
    personaje_likedCrear, //POST
    personaje_likedActualizar, //PUT
    personaje_likedEliminar //DELETE
}