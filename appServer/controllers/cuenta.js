//controllers

// controllers
const request = require('request');
const axios = require('axios');
// definir los URL's para los ambientes de desarrollo y producción
const apiOptions = {
    server: 'http://localhost:3000' // server local - desarrollo
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server ='https://wiki-marvel-git-2a04b3464a8d.herokuapp.com' // server heroku - producción
}




cuenta_page = {
    imagen:"../images/cuenta/usuario.png",
    nombre:"Juan Francisco Cisneros",
    nombre_usuario:"JuanCisneros",
    correo:"juanfrancistm2011@icloud.com",
}

//GET - Obtener un usuario por id desde el api
const userObtener = (req, res,next,error=null) => {
    //con el id del usuario, se obtiene el usuario desde el api
    const path = `/api/users/${req.params.userid}`;

    /**/
/*    request(
        requestOptions,
        (err, response, body) => {
            if (err) {
                console.log('Error al obtener usuario: ', err);
            } else if (response.statusCode === 200) {
                console.log(body);
                cuenta(req, res, body);

            } else {
                console.log('Status: ', response.statusCode);
                res.render('error', {
                    mensaje: 'Existe un error en la colección de usuarios'
                })
            }
        });*/
    axios.get(`${apiOptions.server}${path}`)
    .then((response) => {
        console.log(response.data);
        if (error){
            console.log(error);
            cuenta(req, res, response.data,error.errorContenido);
        }else {
            cuenta(req, res, response.data);
        }
    })
    .catch((error) => {
        console.log(error);
        res.redirect('/register');
    });
}
const cuenta = (req, res, body, err=null) =>{
    res.render('cuenta', { title: 'CUENTA',cuenta_page:body ,errorContenido: err});
}

const cuentaEditar = (req, res, body) =>{
    //con el id del usuario, se obtiene el usuario desde el api
    const path = `/api/users/${req.params.userid}`;
   /* const requestOptions = { // objeto cargado con las opciones para request
        url: `${apiOptions.server}${path}`,
        method: 'PUT',
        json: {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            nombreUsuario: req.body.usuario,
            telefono: req.body.telefono,
            correo: req.body.email,
            contrasena: req.body.password,
        }
    };
    request(
        requestOptions,
        (err, response, body) => {
            if (err) {
                console.log('Error al obtener usuario: ', err);
            } else if (response.statusCode === 200) {
                cuenta(req, res, body.user);
            } else {
                console.log('Status: ', response.statusCode);
                res.render('error', {
                    mensaje: 'Existe un error en la colección de usuarios'
                })
            }
        });*/
    axios.put(`${apiOptions.server}${path}`,{
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        nombreUsuario: req.body.usuario,
        telefono: req.body.telefono,
        correo: req.body.email,
        contrasena: req.body.password,
    })
    .then((response) => {
        console.log(response.data);
        cuenta(req, res, response.data.user);
    })
    .catch((error) => {
        console.log(error);
        userObtener(req, res,null,{errorContenido: "ERROR UPDATE: Verificar los datos ingresados, e intentar de nuevo"});
    });
}

//DELETE - Eliminar un usuario por id
const userEliminar = (req, res) => {
    console.log("eliminar");
    const path = `/api/users/${req.params.userid}`;
/*    const requestOptions = { // objeto cargado con las opciones para request
        url: `${apiOptions.server}${path}`,
        method: 'DELETE',
        json: {}
    };
    request(
        requestOptions,
        (err, response, body) => {
            if (err) {
                console.log('Error al eliminar usuario: ', err);
            } else if (response.statusCode === 204) {
                res.redirect('/');

            } else {
                console.log('Status: ', response.statusCode);
                res.render('error', {
                    mensaje: 'Existe un error en la colección de usuarios'
                })
            }
        });*/
    axios.delete(`${apiOptions.server}${path}`)
    .then((response) => {
        console.log(response.data);
        res.redirect('/');
    })
    .catch((error) => {
        console.log(error);
        userObtener(req, res,null,{errorContenido: "ERROR ELIMINAR: Usuario no existe"});
    });
}


module.exports = {
    userObtener, // GET - Obtener un usuario por id desde el api
    cuentaEditar, // PUT - Actualizar un usuario por id desde el api
    userEliminar // DELETE - Eliminar un usuario por id desde el api
};