//controllers
const axios = require('axios');
const crypto = require("crypto");

// homepage - GET

//obtener un personaje aleatorio cada vez que se recarga la pagina
const get_random_personajes = async () => {
    const url = 'https://gateway.marvel.com:443/v1/public/characters';
    const apiKeyPublic = '5456f838f4febebdfb84a5193ef95e04';
    const apiKeyPrivate = 'cc030a01270693d3e259e92bea5d630c4f23f2a0';
    const ts = '1';
    const hash = crypto.createHash('md5').update(ts + apiKeyPrivate + apiKeyPublic).digest('hex');
    console.log(hash);
    let characters = [];

    try {
        const response = await axios.get(url, {
            params: {
                ts: ts,
                apikey: apiKeyPublic,
                hash: hash,
                limit: 20,
                offset: Math.floor(Math.random() * 1000), //generar aleatorios personajes de la api
            }
        });

        // Get the id and image
        for (let i = 0; i < response.data.data.results.length; i++) {
            const element = response.data.data.results[i];
            if(element.thumbnail.path.includes('image_not_available')){
                continue;
            }
            characters.push({
                id: element.id,
                imagen: element.thumbnail.path + '.' + element.thumbnail.extension,
                titulo: element.name,
                //si no hay descripcion, se muestra un texto por defecto
                descripcion: element.description ? element.description : 'No description available',
            });
        }

    } catch (error) {
        console.log(error);
    }

    return characters;
}

const personajeAleatorio = async () => {
    const personaje_page = await get_random_personajes();
    //sort array by description length, longest first
    personaje_page.sort((a, b) => {
        return b.descripcion.length - a.descripcion.length;
    });
    //get description of first element and cut it to 200 characters
    personaje_page[0].descripcion = personaje_page[0].descripcion.substring(0, 320);
    console.log(personaje_page);
    return personaje_page[0];
}

const index = async (req, res, next) => {
    personaje = await personajeAleatorio(req, res, next);
    res.render('index', {title: 'HOME PAGE', personaje});
    //res.send('respond with a resource
}

module.exports = {
    index, //index - GET
};