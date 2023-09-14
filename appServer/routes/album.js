//express
const express = require('express');
const router = express.Router();
// my modules
//controllers
const {album} = require("../controllers/album");

/* GET album */
router.get('/', album);

module.exports = router;
