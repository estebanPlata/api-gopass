const { default: mongoose } = require('mongoose');
const app = require('./app')
const config = require('./config')
  
/* daba base */
const user = config.user;
const password = config.passWord;
const dbName = config.dbName;
const uri =`mongodb+srv://${user}:${password}@cluster0.cs82u.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri,
    {useNewUrlParser:true, useUnifiedTopology:true},
    app.listen(config.port,()=>{
        console.log(`escuchando en el puerto ${config.port}`);
    })
)
    .then(()=>console.log('Base de datos conectada'))
    .catch(e=> console.log(e))



