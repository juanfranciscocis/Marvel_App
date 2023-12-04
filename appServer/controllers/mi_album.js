//controllers
//obtenemos el cookie del usuario

const axios = require('axios');
const {response} = require("express");
const crypto = require("crypto");
// definir los URL's para los ambientes de desarrollo y producción
const apiOptions = {
    server: 'http://localhost:3000' // server local - desarrollo
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server ='https://wiki-marvel-git-2a04b3464a8d.herokuapp.com' // server heroku - producción
}



//obtener los personajes liked del usuario
let personajes_liked = [];
let iamgenes_personajes = [];
const personajes_liked_db = async (req, res, next) => {

    const user = req.cookies.user;
    //si no hay cookie, redirigir a login
    if (!user) {
        res.redirect('/login');
    }


    const path = `/api/personajes_liked/${user}`;
    await axios.get(`${apiOptions.server}${path}`).then(
        response => {
            console.log(response.data[0].idPersonaje);
            personajes_liked = response.data[0].idPersonaje;
            return personajes_liked;
        }
    )


}



const personajes_liked_db_tu = async (req, res, next) => {

    const path = `/api/personajes_liked/${req.params.userid}`;
    await axios.get(`${apiOptions.server}${path}`).then(
        response => {
            console.log(response.data[0].idPersonaje);
            personajes_liked = response.data[0].idPersonaje;
            return personajes_liked;
        }
    )


}

const buscar_imagenes_marvel_tu = async (req, res, next) => {
    await personajes_liked_db_tu(req, res, next).then(async () => {
        // para cada idPersonaje en personajes_liked se hace una peticion a la api de marvel
        for(let i = 0; i<personajes_liked.length; i++){
            const url = 'https://gateway.marvel.com:443/v1/public/characters/' + personajes_liked[i];
            const apiKeyPublic = '5456f838f4febebdfb84a5193ef95e04';
            const apiKeyPrivate = 'cc030a01270693d3e259e92bea5d630c4f23f2a0';
            const ts = '1';
            const hash = crypto.createHash('md5').update(ts + apiKeyPrivate + apiKeyPublic).digest('hex');

            await axios.get(url, {
                params: {
                    ts: ts,
                    apikey: apiKeyPublic,
                    hash: hash,
                }
            }).then(response => {
                iamgenes_personajes.push(
                    response.data.data.results[0].thumbnail.path + '.' + response.data.data.results[0].thumbnail.extension,
                );
            }).catch(error => {
                console.log(error);
            });
        }
    });
}






const buscar_imagenes_marvel = async (req, res, next) => {
    await personajes_liked_db(req, res, next).then(async () => {
        // para cada idPersonaje en personajes_liked se hace una peticion a la api de marvel
        for(let i = 0; i<personajes_liked.length; i++){
            const url = 'https://gateway.marvel.com:443/v1/public/characters/' + personajes_liked[i];
            const apiKeyPublic = '5456f838f4febebdfb84a5193ef95e04';
            const apiKeyPrivate = 'cc030a01270693d3e259e92bea5d630c4f23f2a0';
            const ts = '1';
            const hash = crypto.createHash('md5').update(ts + apiKeyPrivate + apiKeyPublic).digest('hex');

            await axios.get(url, {
                params: {
                    ts: ts,
                    apikey: apiKeyPublic,
                    hash: hash,
                }
            }).then(response => {
                iamgenes_personajes.push(
                    response.data.data.results[0].thumbnail.path + '.' + response.data.data.results[0].thumbnail.extension,
                );
            }).catch(error => {
                console.log(error);
            });
        }
    });
}






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

const mi_album = async (req, res, next) => {
    personajes_liked = [];
    iamgenes_personajes = [];
    await buscar_imagenes_marvel(req, res, next);
    mi_album_page.personajes_usuario = iamgenes_personajes;
    mi_album_page.usuario.nombre_usuario = req.cookies.user;
    console.log(mi_album_page);
    res.render('mi_album', {title: 'MI_ALBUM', mi_album_page});
}


const tu_album = async (req, res, next) => {
    personajes_liked = [];
    iamgenes_personajes = [];
    await buscar_imagenes_marvel_tu(req, res, next);
    mi_album_page.personajes_usuario = iamgenes_personajes;
    mi_album_page.usuario.nombre_usuario = req.cookies.user;
    console.log(mi_album_page);
    res.render('mi_album', {title: 'ALBUM', mi_album_page});
}

module.exports = {
    mi_album, //index - GET
    tu_album,
};