//controllers

// login - GET
const login = (req, res, next) =>{
    res.render('login', { title: 'LOGIN' });
}

module.exports = {
    login, //register - GET
};