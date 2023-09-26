//express
const express = require('express');
const router = express.Router();
// my modules
    //controllers
const {login} = require("../controllers/login");

/* GET login */
router.get('/', login);

module.exports = router;
