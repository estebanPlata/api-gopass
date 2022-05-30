const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema ({
    img:String,
    description:String,
    title:String,
})

module.exports =  mongoose.model('News', newsSchema)