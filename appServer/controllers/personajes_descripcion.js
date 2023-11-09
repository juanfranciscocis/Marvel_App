//controllers
const axios = require('axios');

// personajes_descripcion - GET
/*personajes_descripcion_page = {
    imagen_personaje: "../images/personajes_descripcion/spiderMan.png",
    titulo_personaje: "TITULO DEL PERSONAJE",
    descripcion_personaje: "Descripción del personaje..Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. ...",
    numero_likes: "100",
}*/
const crypto = require("crypto");
const personajes_descripcion_get = async (req) => {
    const url = 'https://gateway.marvel.com:443/v1/public/characters/' + req.params.id;
    const apiKeyPublic = '5456f838f4febebdfb84a5193ef95e04';
    const apiKeyPrivate = 'cc030a01270693d3e259e92bea5d630c4f23f2a0';
    const ts = '1';
    const hash = crypto.createHash('md5').update(ts + apiKeyPrivate + apiKeyPublic).digest('hex');
    console.log(hash);
    let character;
    try {
        const response = await axios.get(url, {
            params: {
                ts: ts,
                apikey: apiKeyPublic,
                hash: hash,
            }
        });
        const element = response.data.data.results[0];
        character = {
            id: element.id,
            image: element.thumbnail.path + '.' + element.thumbnail.extension,
            name: element.name,
            description: element.description,
        };
        console.log(character);
    } catch (error) {
        console.log(error);
    }
    return character;
}



const personajes_descripcion = async (req, res, next) => {
    const personajes_descripcion_page = await personajes_descripcion_get(req);
    res.render('personajes_descripcion', {title: 'PERSONAJES DESCRIPCION',personajes_descripcion_page: personajes_descripcion_page});
}

module.exports = {
    personajes_descripcion, //index - GET
};