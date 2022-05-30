const express = require('express')
const NewsCtrls = require('../controllers/new')
const api = express.Router();

api.get('/',NewsCtrls.getConexion)
api.get('/news', NewsCtrls.getNews) /* obtenemos toda la data */
api.get('/news/:id',NewsCtrls.getNew)/* obtenemos por id */
    
api.post('/news',NewsCtrls.postNews)/* metodo post */ 
api.put('/news/:id',NewsCtrls.updateNews)
api.delete('/news/:id',NewsCtrls.deleteNews)/* metodo delete */

module.exports = api;