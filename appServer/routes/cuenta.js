//express
const express = require('express');
const router = express.Router();
// my modules
    //controllers
const {cuenta} = require("../controllers/cuenta");

/* GET home page. */
router.get('/', cuenta);

module.exports = router;
