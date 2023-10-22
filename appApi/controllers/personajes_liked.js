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
const personaje_likedActualizar = async (req, res) => {
    persoanjes_db = await personaje_liked.find({idUsuario: req.params.userid}).exec();
    console.log(persoanjes_db);
    persoanjes_db = persoanjes_db[0].idPersonaje;
    persoanjes_db.push(req.body.idPersonaje);
    console.log(persoanjes_db);
    personaje_liked.updateOne({idUsuario: req.params.userid}, {idPersonaje: persoanjes_db}).exec().then(() => {
        res.status(200).json({
            "message": "Personaje liked updated"
        });
    }).catch((err) => {
        res.status(400).json({
            "message": "Error updating personaje liked,verify the data"
        });
    });
}

//UPDATE DELETE ONE - Eliminar un personaje liked por id (CUANDO EL USUARIO ELIMINA SU CUENTA SE ELIMINAN SUS LIKES)
const personaje_likedEliminar = async (req, res) => {
    persoanjes_db = await personaje_liked.find({idUsuario: req.body.userid}).exec();
    console.log(persoanjes_db);
    persoanjes_db = persoanjes_db[0].idPersonaje;
    persoanjes_db.remove(req.body.idPersonaje);
    console.log(persoanjes_db);
    personaje_liked.updateOne({idUsuario: req.body.userid}, {idPersonaje: persoanjes_db}).exec().then(() => {
        res.status(200).json({
            "message": "Personaje liked updated"
        });
    }).catch((err) => {
        res.status(400).json({
            "message": "Error updating personaje liked,verify the data"
        });
    });

}


module.exports = {
    personaje_likedObtenerTodos, //GET
    personaje_likedCrear, //POST
    personaje_likedActualizar, //PUT
    personaje_likedEliminar //DELETE
}