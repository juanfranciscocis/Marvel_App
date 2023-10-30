//express
const express = require('express');
const router = express.Router();
// my modules
//controllers
const {personajes_descripcion} = require("../controllers/personajes_descripcion");

/* GET personajes_descripcion */
router.get('/:id', personajes_descripcion);

module.exports = router;
