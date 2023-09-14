//controllers

// album - GET
const album = (req, res, next) =>{
    res.render('album', { title: 'ALBUM' });
}

module.exports = {
    album, //index - GET
};