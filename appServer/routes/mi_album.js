//express
const express = require('express');
const router = express.Router();
// my modules
//controllers
const {mi_album, tu_album} = require("../controllers/mi_album");

/* GET mi_album */
router.get('/:userid', tu_album);

router.get('/', mi_album);

module.exports = router;
