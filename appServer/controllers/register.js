//controllers

// register - GET
const register = (req, res, next) =>{
    res.render('register', { title: 'REGISTER' });
}

module.exports = {
    register, //register - GET
};