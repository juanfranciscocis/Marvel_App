//express
const express = require('express');
const router = express.Router();
// my modules
    //controllers
const {register,userCrear} = require("../controllers/register");

/* GET register. */
router.get('/', register);

router.route('/')
    .post(userCrear);

module.exports = router;
