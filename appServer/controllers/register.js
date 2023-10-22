//controllers

// controllers
const request = require('request');
const cuenta = require('./cuenta');
// definir los URL's para los ambientes de desarrollo y producción
const apiOptions = {
    server: 'http://localhost:3000' // server local - desarrollo
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server ='https://wiki-marvel-git-2a04b3464a8d.herokuapp.com/' // server heroku - producción
}


// CREATE USER - POST
const userCrear = (req, res) => {
    const path = 'api/users/';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'POST',
        json: {
            nombre: req.body.nombre,
            apellido: req.body.apellidos,
            nombreUsuario: req.body.username,
            telefono: req.body.telefono,
            correo: req.body.email,
            contrasena: req.body.password,
        }
    };
    console.log(requestOptions);
    request(
        requestOptions,
        (err, response, body) => {
            if (response.statusCode === 201) {
                const path = '/cuenta/'+ response.body.user._id;
                res.redirect(path);
            } else {
                console.log('Status: ', response.statusCode);
                console.log(body);
            }
        });
}



// register - GET
const register = (req, res, next) =>{
    res.render('register', { title: 'REGISTER' });
}

module.exports = {
    register, //register - GET
    userCrear // CREATE USER - POST
};