    //init 
    const mongoose = require('mongoose')

    //user schema
    const userSchema  =  mongoose.Schema({
        username : {
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
        password : {
            type : String,
            require : true
        }, 
        isActive : {
            type : Boolean,
            default : true  
        }, 
        createdOn : {
            type : Date, 
            default : Date.now()
        }
    })


    //user model
    mongoose.model('users', userSchema)

    //module export
    module.exports = mongoose.model('users')