//conection to mongodb
const mongoose = require('mongoose');

//STRING DE CONEXION -> db uri
const dbURI = 'mongodb+srv://juanfrancistm2011:06012002jF_@marveldb.rejhjcx.mongodb.net/?retryWrites=true&w=majority';

//REQUERIR EL MODELO
require('./userSchema');
require('./personajeSchema');

//READLINE (listen for windows events)
const readLine = require('readline');

//ESCUCHAR EL EVENTO DE WINDOWS SIGINT
if (process.platform === 'win32'){
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('SIGINT', () => {
        process.emit("SIGINT");
    }); //EMITIR EVENTO SIGINT CUANDO SE PRESIONE CTRL+C
}

//CERRRAR LA CONEXION
const processShutdown = (msg, callback) => {
    mongoose.connection.close();
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
}

//SEÑALES DE TERMINACION
//WINDOWS: SIGINT
process.on('SIGINT', () => {
    processShutdown('APP TERMINATION WINDOWS', () => {
        process.exit(0);
    });
});
//NODEMON: SIGUSR2
process.once('SIGUSR2', () => {
    processShutdown('NODEMON RESTART', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});
//HEROKU: SIGTERM
process.on('SIGTERM', () => {
    processShutdown('HEROKU APP SHUTDOWN', () => {
        process.exit(0);
    });
});

//1. CONEXION - DW3
mongoose.connect(dbURI, {
    family:4, //PRUEBO IPV6, SI NO IPV4
    serverSelectionTimeoutMS: 5000, //TIEMPO DE ESPERA
}).catch(err => console.log('SE PRESENTO UN ERROR EN MONGODB', err.reason));

//CONEXION EXITOSA
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

//CONEXION FALLIDA
mongoose.connection.on('error', err => {
    console.log(`Mongoose connection error: ${err} , ${dbURI}`);
});

//DESCONEXION
mongoose.connection.on('disconnected', () => {
    console.log(`Mongoose disconnected ${dbURI}`);
});










