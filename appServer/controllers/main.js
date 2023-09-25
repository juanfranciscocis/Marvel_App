//controllers

// homepage - GET
personaje = {
    imagen: "../images/home_page/spiderMan.png",
    titulo: "SPIDERMAN",
    descripcion_personaje: "Spider-Man, traducido en ocasiones como el Hombre Ara&ntilde;a,es un personaje creado por los estadounidenses Stan Lee y Steve Ditko e introducido en el c&oacute;mic Amazing Fantasy n.&deg; 15, publicado por Marvel Comics en agosto de 1962",
}

const index = (req, res, next) =>{
    res.render('index', { title: 'MARVEL WIKI', personaje});
}

module.exports = {
    index, //index - GET
};