//controllers
// controllers
//const request = require('request');
const axios = require('axios');
// definir los URL's para los ambientes de desarrollo y producción
const apiOptions = {
    server: 'http://localhost:3000' // server local - desarrollo
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server ='https://wiki-marvel-git-2a04b3464a8d.herokuapp.com' // server heroku - producción
}
const isLogged = (req, res, next) => {
    //retrive cookie
    const user = req.cookies.user;
    console.log('Cookie Login:', user);
    return user ? res.redirect(`/cuenta/${user}`) : false;
}



// login - GET
const login = (req, res, next) =>{
    isLogged(req, res, next);
    res.render('login', { title: 'LOGIN', errorContenido: null});
}

const hacerLogin = (req, res, next) =>{
    path = '/api/users/login';
/*    requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {
            correo: req.body.email,
            contrasena: req.body.password
        }
    };
    console.log(requestOptions);*/
/*    request(
        requestOptions,
        (err, response, body) => {
            if (response.statusCode === 200) {
                console.log(body);
                const path = '/cuenta/'+ body.user._id;
                console.log(path);
                res.redirect(path);
            } else {
                console.log('Status: ', response.statusCode);
                console.log(body);
            }
        }
    );*/
    axios.get(`${apiOptions.server}${path}`,{
        data: {
            correo: req.body.email,
            contrasena: req.body.password
        }
    })
    .then((response) => {
        console.log(response.data);
        const path = '/cuenta/'+ response.data.user._id;
        console.log(path);
        res.redirect(path);
    })
    .catch((error) => {
        console.log(error);
        res.render('login', { title: 'LOGIN', errorContenido: "ERROR: Usuario o contraseña incorrectos"})
    });
}

module.exports = {
    login, //register - GET
    hacerLogin // login - POST
};