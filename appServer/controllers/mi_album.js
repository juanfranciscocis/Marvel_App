//controllers

// mi_album - GET
mi_album_page = {
    usuario: {
        imagen_usuario: "../images/mi_album/usuario.png",
        nombre_usuario: "Nombre Usuario",
    },
    personajes_usuario: [
        "../images/mi_album/imagen1.png",
        "../images/mi_album/imagen2.png",
        "../images/mi_album/imagen3.png",
        "../images/mi_album/imagen4.png",
        "../images/mi_album/imagen5.png",
        "../images/mi_album/imagen6.png",
        "../images/mi_album/imagen7.png",
        "../images/mi_album/imagen8.png",
        "../images/mi_album/imagen9.png",

    ],
}

const mi_album = (req, res, next) =>{
    res.render('mi_album', { title: 'MI_ALBUM', mi_album_page});
}

module.exports = {
    mi_album, //index - GET
};