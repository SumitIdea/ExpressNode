// init code
const express = require('express')
const morgan = require('morgan')
const cors  = require('cors')
const app =  express()

const port = 3000
const database = require('./database/database')
const userController =  require('./controllers/userController')
const imageController =  require('./controllers/ImageController')
const chalk=require("chalk");
const fs = require("fs");

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 100, // limit each IP to 500 requests per windowMs
  });
  
  app.use(limiter);

  // middleware setup 
app.use(morgan('dev'))
app.use(cors()) 
app.use('/api/user',userController)
app.use('/api/user',imageController)

  
// default routes
app.all(
    '/',
    function(req, res)
    {
        return res.json({
            status: true,
            message: 'Welcome to the world of Sumit '
        })
    }
)

//start server 
app.listen(port,
    function(){
        console.log(chalk.green("Server running at port : "+port));
    }
)
