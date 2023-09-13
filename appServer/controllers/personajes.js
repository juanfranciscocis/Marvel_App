//controllers

// homepage - GET
const personajes = (req, res, next) =>{
    res.render('personajes', { title: 'PERSONAJES' });
}

module.exports = {
    personajes, //index - GET
};