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
            "user": user
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
            "message": "User not found",
        });
    });
}

//GET - Obtener un usario por email y contraseña
const userObtenerPorEmail = (req, res) => {
    console.log(req.body);
    //solo si el correo y la contraseña coinciden, se obtiene el usuario de la base de datos
    users.findOne({ correo: req.body.correo, contrasena: req.body.contrasena }).exec().then((user) => {
        res.status(200).json
            ({
                "message": "User found",
                "user": user
            });
            }).catch((err) => {
                res.status(404).json({
                    "message": "User not found",
                });
            }
            );



}

//PUT - Actualizar un usuario por id
const userActualizar = (req, res) => {
    users.findById(req.params.userid).exec().then((user) => {
        user.nombre = req.body.nombre;
        user.apellido = req.body.apellido;
        user.nombreUsuario = req.body.nombreUsuario;
        user.telefono = req.body.telefono;
        user.correo = req.body.correo;
        user.contrasena = req.body.contrasena;
        user.save().then(() => {
            res.status(200).json({
                "message": "User updated",
                "user": user

            });
        }).catch((err) => {
            res.status(400).json({
                "message": "Error updating user,verify the data"
            });
        });

    });
}

//DELETE - Eliminar un usuario por id
const userEliminar = (req, res) => {
    users.findByIdAndRemove(req.params.userid).exec().then(() => {
        res.status(204).json({
            "message": "User deleted"
        });
    }).catch((err) => {
        res.status(404).json({
            "message": "User not found"
        });
    });
}

module.exports = {
    userCrear, //POST
    userObtenerTodos, //GET
    userObtenerUno, //GET
    userActualizar, //PUT
    userEliminar, //DELETE
    userObtenerPorEmail //GET

}


