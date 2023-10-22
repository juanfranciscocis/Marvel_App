//controllers

// controllers
const request = require('request');
// definir los URL's para los ambientes de desarrollo y producción
const apiOptions = {
    server: 'http://localhost:3000' // server local - desarrollo
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server ='https://wiki-marvel-git-2a04b3464a8d.herokuapp.com/' // server heroku - producción
}




cuenta_page = {
    imagen:"../images/cuenta/usuario.png",
    nombre:"Juan Francisco Cisneros",
    nombre_usuario:"JuanCisneros",
    correo:"juanfrancistm2011@icloud.com",
}

//GET - Obtener un usuario por id desde el api
const userObtener = (req, res) => {
    //con el id del usuario, se obtiene el usuario desde el api
    const path = `api/users/${req.params.userid}`;
    const requestOptions = { // objeto cargado con las opciones para request
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    };
    request(
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
        });
}
const cuenta = (req, res, body) =>{
    res.render('cuenta', { title: 'CUENTA',cuenta_page:body });
}

const cuentaEditar = (req, res, body) =>{
    //con el id del usuario, se obtiene el usuario desde el api
    const path = `api/users/${req.params.userid}`;
    const requestOptions = { // objeto cargado con las opciones para request
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
        });

}

//DELETE - Eliminar un usuario por id
const userEliminar = (req, res) => {
    console.log("eliminar");
    const path = `api/users/${req.params.userid}`;
    const requestOptions = { // objeto cargado con las opciones para request
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
        });
}


module.exports = {
    userObtener, // GET - Obtener un usuario por id desde el api
    cuentaEditar, // PUT - Actualizar un usuario por id desde el api
    userEliminar // DELETE - Eliminar un usuario por id desde el api
};