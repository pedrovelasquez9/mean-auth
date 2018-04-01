var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo');
var cors = require('cors')

app.use(cors());
//conexión a MongoDB
mongoose.connect('mongodb://localhost/usuarios');
var db = mongoose.connection;

//caso de error de conexión mongo
db.on('error', console.error.bind(console, 'error al conectarse a mongo:'));
db.once('openUri', function () {
  
});

// Formateo de peticiones
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Inclusión de rutas
var routes = require('./rutas/router');
app.use('/', routes);

app.listen(3000, function () {
  console.log('Escuchando en el puerto 3000');
});