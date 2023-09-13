//controllers

// homepage - GET
const index = (req, res, next) =>{
    res.render('index', { title: 'MARVEL WIKI' });
}

module.exports = {
    index, //index - GET
};