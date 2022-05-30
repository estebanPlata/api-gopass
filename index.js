const express = require('express');
const bodyParser = require('body-parser');
const News = require('./models/new')

const { default: mongoose } = require('mongoose');

const app = express();
const port = process.env.PORT || 3000/* definimos puerto */
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())/* parseamos el objeto como json */


app.get('/',(req,res)=>{
    res.send({message:'API creada por esteban plata'})
})
app.get('/news',(req,res)=>{ /* obtenemos toda la data */
    News.find({}, (err,pro)=>{
        if(err) return res.status(500).send({message:`Error al enviar la petición: ${err}`})
        if(!pro) return res.status(404).send({message:`La noticia no existe`})

        res.status(200).send(pro);
        
    })
})
app.get('/news/:id',(req,res)=>{/* obtenemos por id */
    let newsId = req.params.id
    News.findById(newsId,(err, pro) =>{
        if(err) return res.status(500).send({message:`Error al enviar la petición: ${err}`})
        if(!pro) return res.status(404).send({message:`La noticia no existe`})

        res.status(200).send({id:pro})
    })
})
app.post('/news',(req,res)=>{/* metodo post */
    console.log('POST');
    console.log(req.body);
    let news = new News();
    news.img = req.body.img
    news.title = req.body.title
    news.description = req.body.description

    news.save((err,newStored)=>{
        if(err) res.status(500).send({message:`Error al guardar en base de datos: ${err}`})
        res.status(200).send({news:newStored})
    })
});
app.put('/news/:id',(req,res)=>{
    let newsId = req.params.id
    let update = req.body

    News.findByIdAndUpdate(newsId,update,(err, newsUpdate)=>{
        if(err) return res.status(500).send({message:`Error al actualizar noticia: ${err}`})

        res.status(200).send({newsId:newsUpdate})
    })
})

app.delete('/news/:id',(req,res)=>{/* metodo delete */
    let newsId = req.params.id
    News.findById(newsId,(err,pro)=>{
        if(err) return res.status(500).send({message:`Error al eliminar noticia: ${err}`})
         
        pro.remove(err=>{/* funcion para eliminar*/
            if(err) return res.status(500).send({message:`Error al eliminar noticia: ${err}`})
            res.status(200).send({message:`El producto ha sido eliminado: ${err}`})
        })
    })
})
/* daba base */
const user ='estebanGoPass';
const password ='f7nUcMUOmN3CtxDW';
const dbName = 'News'
const uri =`mongodb+srv://${user}:${password}@cluster0.cs82u.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri,
    {useNewUrlParser:true, useUnifiedTopology:true}
)
    .then(()=>console.log('Base de datos conectada'))
    .catch(e=> console.log(e))

app.listen(port,()=>{
    console.log(`escuchando en el puerto ${port}`);
})

