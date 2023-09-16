//controllers

// homepage - GET
const cuenta = (req, res, next) =>{
    res.render('cuenta', { title: 'CUENTA' });
}

module.exports = {
    cuenta, //cuenta - GET
};