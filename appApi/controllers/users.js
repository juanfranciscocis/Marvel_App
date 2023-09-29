//controllers
const { request } = require('express');
const mongoose = require('mongoose'); //incorporar mongoose a la REST API
const users = mongoose.model('user'); //el modelo me permite interactuar con la coleccion users

//POST - Crear un nuevo usuario
const userCrear = (req, res) => {
    users.create({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        nombreUsuario: req.body.nombreUsuario,
        telefono: req.body.telefono,
        correo: req.body.correo,
        contrasena: req.body.contrasena,
        imagen: req.body.imagen
    }).then((user) => {
        res.status(201).json({
            "message": "User created",
        });
    }).catch((err) => {
        res.status(400).json({
            "message": "Error creating user,verify the data",
        });

    });
}

//GET - Obtener todos los usuarios
const userObtenerTodos = (req, res) => {
    users.find().exec().then((users) => {
        res.status(200).json(users);
    }).catch((err) => {
        res.status(404).json(err);
    });
}

//GET - Obtener un usuario por id
const userObtenerUno = (req, res) => {
    users.findById(req.params.userid).exec().then((user) => {
        res.status(200).json(user);
    }).catch((err) => {
        res.status(404).json({
            "message": "User not found"
        });
    });
}

//PUT - Actualizar un usuario por id
const userActualizar = (req, res) => {
    res.status(200).json({ "status": "success" });
}

//DELETE - Eliminar un usuario por id
const userEliminar = (req, res) => {
    res.status(204).json({ "status": "success" });
}

module.exports = {
    userCrear, //POST
    userObtenerTodos, //GET
    userObtenerUno, //GET
    userActualizar, //PUT
    userEliminar //DELETE
}


