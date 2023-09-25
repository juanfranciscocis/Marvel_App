//controllers

// album - GET
album_card = {
    imagen_usuario: "../images/album/usuario.png",
    nombre_usuario: "Nombre Usuario",
    top_personajes: [
        imagen1 = "../images/album/imagen1.png",
        imagen2 = "../images/album/imagen2.png",
        imagen3 = "../images/album/imagen3.png",
        imagen4 = "../images/album/imagen4.png",
    ],
}

// (THIS FUNCTION WILL GET 10 RANDOM CARDS FROM THE DATABASE)
get_random_album = () => {
    //GET FROM MONGO
    //return 10 random cards
    cards = [
        album_card,
        album_card,
        album_card,
        album_card,
        album_card,
        album_card,
        album_card,
        ];
    return cards;
}

const album = (req, res, next) =>{
    res.render('album', { title: 'ALBUM', cards: get_random_album()});
}

module.exports = {
    album, //index - GET
};