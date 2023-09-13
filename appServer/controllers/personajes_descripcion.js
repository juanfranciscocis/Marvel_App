//controllers

// personajes_descripcion - GET
const personajes_descripcion = (req, res, next) =>{
    res.render('personajes_descripcion', { title: 'PERSONAJES DESCRIPCION' });
}

module.exports = {
    personajes_descripcion, //index - GET
};