// init code
const express = require('express')
const morgan = require('morgan')
const cors  = require('cors')
const bodyParser = require('body-parser'),jsonwebtoken = require("jsonwebtoken");
const path = require("path")

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
    max: 1000, // limit each IP to 500 requests per windowMs
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

//end  
var publicDir = require('path').join(__dirname,'./views/images')
app.use(express.static(publicDir));
var jsDir = require('path').join(__dirname,'./views/js')
app.use(express.static(jsDir));
var cssDir = require('path').join(__dirname,'./views/css')
app.use(express.static(cssDir));
app.set("view engine", "ejs");

// default routes
app.all(
    '/index.html',
    function(req, res)
    {
      // fs.readFile('./views/index.html', function(err, data) {
      //   res.writeHead(200, {'Content-Type': 'text/html'});
      //   res.write(data);
      //   return res.end();
      // });

      res.sendFile(path.join(__dirname, "views/index.html"))

        // return res.json({
        //     status: true,
        //     message: 'Welcome to the world of Sumit '
        // })
    }
)

app.get('/about.html',function(req,res){
  res.sendFile(path.join(__dirname, "views/about.html"))
})
app.get('/products.html',function(req,res){
  res.sendFile(path.join(__dirname, "views/products.html"))
})
app.get('/contact.html',function(req,res){
  res.sendFile(path.join(__dirname, "views/contact.html"))
})
app.get('/fashion.html',function(req,res){
  res.sendFile(path.join(__dirname, "views/fashion.html"))
})
app.get('/news.html',function(req,res){
  res.sendFile(path.join(__dirname, "views/news.html"))
})


//start server 
app.listen(port,
    function(){
        console.log(chalk.green("Server running at port : "+port));
    }
)
