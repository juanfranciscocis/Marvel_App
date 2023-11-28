//express
const express = require('express');
const router = express.Router();
// my modules
//controllers
const {personajes_descripcion,personajes_descripcion_like} = require("../controllers/personajes_descripcion");

/* GET personajes_descripcion */
router.get('/:id', personajes_descripcion);

router.get('/like/:id', personajes_descripcion_like);



module.exports = router;
