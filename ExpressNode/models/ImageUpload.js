 //init 
 const mongoose = require('mongoose')

 //user schema
 const imgSchema  =  mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String,
        path: String // Add this field to store the path

    }
})

    //user model
    mongoose.model('image', imgSchema)

    //module export
    module.exports = mongoose.model('image')