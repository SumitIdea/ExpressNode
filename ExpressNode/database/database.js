//init 
// import keys from '../credentials/keys'
const mongoose = require('mongoose')
const assert = require('assert');
const uri = require('../credentials/keys')
const chalk=require("chalk");

//connection code
mongoose.set('strictQuery', false)

mongoose.connect(uri.mongoURL,{useNewUrlParser: false},
    function(error,link){
        //check error
        assert.equal(error,null,'DB connect failed....')

        //Ok
        console.log(chalk.green("DB Connect Success"));
        // console.log(link);
    })

   
      
               

// mongoose.connection.on('connected',()=>{
//   console.log("You are now connected to mongo");
  
// })

// mongoose.connection.on('error',(err)=>{
//   console.log("not connected to the mongo",err);
  
// })
