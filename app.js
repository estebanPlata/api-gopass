const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const api = require('./routes/metodos')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())/* parseamos el objeto como json */
app.use(api)


module.exports = app;