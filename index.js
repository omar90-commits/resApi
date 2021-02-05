require('./config/db');
const express = require('express');
const routes = require('./routes/');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

// crear el servidor
const app = express();

app.use( fileUpload() );

// Body parser
app.use( bodyParser.urlencoded({ extend: false }) );
app.use( bodyParser.json() );

app.use('/', routes());

app.listen('3000', () => console.log('corriendo en el puerto 3000'));