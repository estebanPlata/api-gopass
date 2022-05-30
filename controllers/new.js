const News = require('../models/new')

function getConexion(){
    res.send({message:'API creada por esteban plata'})
}

function getNew(req,res){
    let newsId = req.params.id
    News.findById(newsId,(err, pro) =>{
        if(err) return res.status(500).send({message:`Error al enviar la petición: ${err}`})
        if(!pro) return res.status(404).send({message:`La noticia no existe`})

        res.status(200).send({id:pro})
    })
}

function getNews(req,res){
    News.find({}, (err,pro)=>{
        if(err) return res.status(500).send({message:`Error al enviar la petición: ${err}`})
        if(!pro) return res.status(404).send({message:`La noticia no existe`})

        res.status(200).send(pro);
        
    })
}

function updateNews(req,res){
    let newsId = req.params.id
    let update = req.body

    News.findByIdAndUpdate(newsId,update,(err, newsUpdate)=>{
        if(err) return res.status(500).send({message:`Error al actualizar noticia: ${err}`})

        res.status(200).send({newsId:newsUpdate})
    })
}

function deleteNews(req,res){
    let newsId = req.params.id
    News.findById(newsId,(err,pro)=>{
        if(err) return res.status(500).send({message:`Error al eliminar noticia: ${err}`})
         
        pro.remove(err=>{/* funcion para eliminar*/
            if(err) return res.status(500).send({message:`Error al eliminar noticia: ${err}`})
            res.status(200).send({message:`El producto ha sido eliminado: ${err}`})
        })
    })
}

function postNews(req,res){
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
}

module.exports ={
    getConexion,
    getNew,
    getNews,
    updateNews,
    deleteNews,
    postNews
}