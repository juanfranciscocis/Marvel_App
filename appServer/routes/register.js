//express
const express = require('express');
const router = express.Router();
// my modules
    //controllers
const {register} = require("../controllers/register");

/* GET home page. */
router.get('/', register);

module.exports = router;
