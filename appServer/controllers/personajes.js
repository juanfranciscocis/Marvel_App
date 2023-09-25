//controllers

// personajes - GET
personajes_page = [
        "../images/mi_album/imagen1.png",
        "../images/mi_album/imagen2.png",
        "../images/mi_album/imagen3.png",
        "../images/mi_album/imagen4.png",
        "../images/mi_album/imagen5.png",
        "../images/mi_album/imagen6.png",
        "../images/mi_album/imagen7.png",
        "../images/mi_album/imagen8.png",
        "../images/mi_album/imagen9.png",
    ];




const personajes = (req, res, next) =>{
    res.render('personajes', { title: 'PERSONAJES', personajes_page });
}

module.exports = {
    personajes, //index - GET
};