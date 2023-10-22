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
// login - GET
const login = (req, res, next) =>{
    res.render('login', { title: 'LOGIN' });
}

const hacerLogin = (req, res, next) =>{
    path = 'api/users/login/';
    requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {
            correo: req.body.email,
            contrasena: req.body.password
        }
    };
    console.log(requestOptions);
    request(
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
    );




}

module.exports = {
    login, //register - GET
    hacerLogin // login - POST
};