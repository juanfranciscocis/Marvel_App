//controllers
const axios = require('axios');
const crypto = require("crypto");
// definir los URL's para los ambientes de desarrollo y producción
const apiOptions = {
    server: 'http://localhost:3000' // server local - desarrollo
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server ='https://wiki-marvel-git-2a04b3464a8d.herokuapp.com' // server heroku - producción
}

// get - todos los usuarios
let album_card = [];
const get_users = async (req, res, next) => {
    const path = `/api/users`;
    await axios.get(`${apiOptions.server}${path}`)
        .then((response) => {
            try {
                //array que almacena todos albums
                for (let i = 0; i < response.data.length; i++) {
                    album_card.push({
                        //nombre_usuario, id
                        id_usuario: response.data[i]._id, //id del usuario
                        nombre_usuario: response.data[i].nombreUsuario, //nombre del usuario
                    });
                }
            } catch (e) {
                console.log(e);
            }
        })
}


// personajes liked por el usuario
const get_personajes_liked = async (req, res, next) => {
    await get_users().then(async () => {
        try {
            const path = `/api/personajes_liked/`;
            for (let i = 0; i < album_card.length; i++) {
                await axios.get(`${apiOptions.server}${path}${album_card[i].id_usuario}`)
                    .then((response) => {
                        try {
                            album_card[i].personajes_liked = response.data[0].idPersonaje;
                        } catch (e) {
                            album_card[i].personajes_liked = [];
                        }
                    })
            }
        } catch (e) {
            console.log(e);
        }
    });
}

const buscar_imagenes_marvel = async (req, res, next) => {
    await get_personajes_liked().then(async () => {
        for(let i = 0; i < album_card.length; i++){
            const top_personajes = [];
            for(let j = 0; j < album_card[i].personajes_liked.length; j++){
                const url = 'https://gateway.marvel.com:443/v1/public/characters/' + album_card[i].personajes_liked[j];
                const apiKeyPublic = '5456f838f4febebdfb84a5193ef95e04';
                const apiKeyPrivate = 'cc030a01270693d3e259e92bea5d630c4f23f2a0';
                const ts = '1';
                const hash = crypto.createHash('md5').update(ts + apiKeyPrivate + apiKeyPublic).digest('hex');
                try {
                    const response = await axios.get(url, {
                        params: {
                            ts: ts,
                            apikey: apiKeyPublic,
                            hash: hash,
                        }
                    });
                    const element = response.data.data.results[0];
                    top_personajes.push(
                        element.thumbnail.path + '.' + element.thumbnail.extension,
                    );
                } catch (error) {
                    console.log(error);
                }
            }
            album_card[i].top_personajes = top_personajes;
        }


    });
}



let album = async (req, res, next) => {
    await buscar_imagenes_marvel();
    console.log(album_card);
    res.render('album', {title: 'ALBUM', cards: album_card});
    album_card = [];
}

module.exports = {
    album, //index - GET
};