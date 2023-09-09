//controllers

// homepage - GET
const index = (req, res, next) =>{
    res.render('index', { title: 'Wiki Marvel!' });
}




module.exports = {
    index, //index - GET
};