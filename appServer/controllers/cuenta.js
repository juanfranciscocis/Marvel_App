//controllers

// cuenta - GET
cuenta_page = {
    imagen:"../images/cuenta/usuario.png",
    nombre:"Juan Francisco Cisneros",
    nombre_usuario:"JuanCisneros",
    correo:"juanfrancistm2011@icloud.com",
}




const cuenta = (req, res, next) =>{
    res.render('cuenta', { title: 'CUENTA', cuenta_page });
}

module.exports = {
    cuenta, //cuenta - GET
};