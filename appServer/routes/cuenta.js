//express
const express = require('express');
const router = express.Router();
// my modules
    //controllers
const {cuentaEditar,userEliminar,userObtener} = require("../controllers/cuenta");

/* GET home page. */
router.get('/:userid', userObtener);

router.route('/:userid')
    .post(cuentaEditar)

router.route("/eliminar/:userid")
    .get(userEliminar)



module.exports = router;
