    //init 
    const mongoose = require('mongoose')

    //user schema
    const userContact  =  mongoose.Schema({
        username : {
            type : String,
            require : true
        }, 
        phone : {
            type : String,
            require : true
        },
        email : {
            type : String,
            require : true, 
            trim: true,
            lowercase: true,
            unique:[true, "Email Id already present"],
            required: 'Email address is required',
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
         },
         address : {
            type : String,
            require : true
        },
        message : {
            type : String,
            require : true
        }, 
        createdOn : {
            type : Date, 
            default : Date.now()
        }
    })


    //user model
    mongoose.model('contacts', userContact)

    //module export
    module.exports = mongoose.model('contacts')