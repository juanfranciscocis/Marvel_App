//express
const express = require('express');
const router = express.Router();
// my modules
    //controllers
const {login,hacerLogin} = require("../controllers/login");

/* GET login */
router.get('/', login);

router.route('/')
    .post(hacerLogin);

module.exports = router;
