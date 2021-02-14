require('./config/db');
const express = require('express');
const routes = require('./routes/');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

// crear el servidor
const app = express();

app.use( fileUpload() );

// Body parser
app.use( bodyParser.urlencoded({ extend: false }) );
app.use( bodyParser.json() );

// Habilitar cors
app.use( cors() );

app.use('/', routes());

app.listen('5000', () => console.log('corriendo en el puerto 5000'));