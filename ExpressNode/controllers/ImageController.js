// init code
const express = require('express')
const router  = express()
const bodyParser = require('body-parser') // it is used to handle html form data 
const bcrypt = require('bcryptjs')
const { check, validationResult} = require('express-validator')
const imgModel = require('../models/ImageUpload')
//middleware setup 
const path = require('path');
const fs = require("fs");
const multer = require("multer");
const mongoose = require('mongoose')
router.use(bodyParser.json())
router.use(bodyParser.raw({ extended: true }))
// const express = require('express');
// const app = express();

// Set EJS as the view engine
router.set('views', path.join(__dirname, 'views'))
router.set('view engine', 'ejs');
// router.use('/', router);

const chalk = require('chalk')

const checkFileType = function (file, cb) {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png|gif|svg/;

  //check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  console.log(extName+"..................."+mimeType);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Images!!");
  }
};

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now()+'.png');
  }
});
var upload = multer({
  storage: storage, limits: { fileSize: 10000000 }, //10 MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }}).single('img');


router.get("/getphoto",  (req, res) => {
  imgModel.find({}, (err, images) => {
    if (err) {
        console.log("Error 500",err);
        return res.status(500).send("An error occurred", err);
    } else {
      // console.log("Render 200",images);
      return res.status(200).send({
        status : true,
        method : "GET",
        message : "Image Fetch Successfully",
        body : images
      })
        // res.render("../../views/demoimage", {images: images,title:'Image Upload Demo'});
    }
  });
});


router.post('/uploadphoto', function (req, res) {
upload(req, res, async (err) => {
  try {
      success(res,req)
  } catch (error) {
    console.error(error);
  }
});
});

const success = async (res,req) => {
  var newImg = fs.readFileSync(req.file.path);

  console.log("imgggggg",req.file.path);
  // encode the file as a base64 string.
  var encImg = newImg.toString('base64');
  // console.log("base64 string",encImg);

  const {name,desc}=req.body
  
  // Store the file to the specified path
  const newPath = path.join("../uploads"+req.file.filename);
  fs.writeFileSync(newPath, encImg);

   // Create a new Image model and save it to the database
   const newImageModel = new imgModel({
    name,
    desc,
    img: {
      data: encImg,
      contentType: req.file.mimetype,
      path: newPath // Set the path where the image is saved
    }
  });

 
  try{
    const success=await newImageModel.save()
    if(!success){
   return res.status(401).send("error in saving"+success)
    }
    return res.status(200).send({
      status : true,
      method : "POST",
      message : "Image uploaded Successfully",
    
    })
  }catch(err){
    return res.status(401).send("error"+err.message)
  }
  
}


//module export 
module.exports = router 
