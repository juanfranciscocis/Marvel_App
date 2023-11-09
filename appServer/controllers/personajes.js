const crypto = require('crypto');
const axios = require('axios');

// HACER UN API REQUEST A MARVEL
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
                limit: 100,
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
                image: element.thumbnail.path + '.' + element.thumbnail.extension,
            });
        }

    } catch (error) {
        console.log(error);
    }

    return characters;
}

const personajes = async (req, res, next) => {
    const personajes_page = await get_random_personajes();
    console.log(personajes_page);
    res.render('personajes', { title: 'PERSONAJES', personajes_page: personajes_page});
}

module.exports = {
    personajes, // index - GET
};
