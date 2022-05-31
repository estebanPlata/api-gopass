const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const api = require('./routes/metodos')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())/* parseamos el objeto como json */
app.use(api)
app.use(cors())/* cualquier origen puede consumir o hacer uso de esta api */


module.exports = app;