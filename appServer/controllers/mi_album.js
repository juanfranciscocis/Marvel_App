//controllers

// mi_album - GET
const mi_album = (req, res, next) =>{
    res.render('mi_album', { title: 'MI_ALBUM' });
}

module.exports = {
    mi_album, //index - GET
};