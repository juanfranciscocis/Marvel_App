const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./appServer/routes/index');
const usersRouter = require('./appServer/routes/users');
const personajesRouter = require('./appServer/routes/personajes');
const personajes_descripcionRouter = require('./appServer/routes/personajes_descripcion');
const mi_albumRouter = require('./appServer/routes/mi_album');

const app = express();



// view engine setup
app.set('views', path.join(__dirname, 'appServer','views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/personajes", personajesRouter); //añadimos la ruta de personajes
app.use("/personajes_descripcion", personajes_descripcionRouter); //añadimos la ruta de personajes_descripcion
app.use("/mi_album", mi_albumRouter); //añadimos la ruta de mi_album

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;