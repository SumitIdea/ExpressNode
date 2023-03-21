// init code
const express = require('express')
const morgan = require('morgan')
const cors  = require('cors')
const bodyParser = require('body-parser'),jsonwebtoken = require("jsonwebtoken");

const app =  express()
const rateLimit = require('express-rate-limit')

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


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/user',userController)
app.use('/api/user',imageController)
// newUserSchema
app.use(function(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      });
    } else {
      req.user = undefined;
      next();
    }
  });
  var routes = require('./api/UserRoute');
  routes(app);
  
  app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
  });

//end  
  
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
