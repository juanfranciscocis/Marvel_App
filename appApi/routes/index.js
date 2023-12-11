const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controllers/users');
const ctrlPersonajes_liked = require('../controllers/personajes_liked');

//Definir las rutas para las acciones CRUD sobre users
router
    .route('/users')
    .post(ctrlUsers.userCrear)
    .get(ctrlUsers.userObtenerTodos);



router
    .route('/users/login/')
    .get(ctrlUsers.userObtenerPorEmail);

router
    .route('/login')
    .post(ctrlUsers.userObtenerPorEmail);

router
    .route('/users/:userid')
    .get(ctrlUsers.userObtenerUno)
    .put(ctrlUsers.userActualizar)
    .delete(ctrlUsers.userEliminar);



router
    .route('/personajes_liked/:userid')
    .get(ctrlPersonajes_liked.personaje_likedObtenerTodos)
    .post(ctrlPersonajes_liked.personaje_likedCrear)
    .put(ctrlPersonajes_liked.personaje_likedActualizar);

router
    .route('/personajes_liked/')
    .put(ctrlPersonajes_liked.personaje_likedEliminar);

module.exports = router;