//controllers

// homepage - GET
const index = (req, res, next) =>{
    res.render('index', { title: 'Mi primera pagina Express!!' });
}




module.exports = {
    index, //index - GET
};