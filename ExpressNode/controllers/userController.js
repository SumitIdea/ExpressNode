// init code
const router = require('express').Router()
const bodyParser = require('body-parser') // it is used to handle html form data 
const bcrypt = require('bcryptjs')
const { check, validationResult, matchedData } = require('express-validator')
//middleware setup 
const expressValidator = require('express-validator'); // import the express-validator module

const User = require('../models/User')
const mongoose = require('mongoose')

router.use(bodyParser.json())
router.use(bodyParser.raw({ extended: true }))

//default route
router.all(
    '/',
    function (req, res) {
        return res.json({
            status: true,
            message: 'user controller working .....'
        })
    }
)
router.post(
    '/createNew',
    [

        // first Name validation
        //   check('firstName').trim().notEmpty().withMessage('First Name required')
        //   .matches(/^[a-zA-Z ]*$/).withMessage('Only Characters with white space are allowed'),
        // last Name validation
        //   check('lastName').notEmpty().withMessage('Last Name required')
        //   .matches(/^[a-zA-Z ]*$/).withMessage('Only Characters with white space are allowed'),
        // check not empty fields
        check('username').notEmpty().trim().escape().exists().withMessage('Name Should Be Write!').isLength({ min: 5, max: 30 }).withMessage('Name Should Be Write With 5 Character!'),
        // email address validation
        check('emailAddress').notEmpty().withMessage('Email Address required').normalizeEmail().isEmail().withMessage('must be a valid email'),
        // password validation
        check('password').trim().notEmpty().withMessage('Password required')
            .isLength({ min: 5 }).withMessage('password must be minimum 5 length')
            .matches(/(?=.*?[A-Z])/).withMessage('At least one Uppercase')
            .matches(/(?=.*?[a-z])/).withMessage('At least one Lowercase')
            .matches(/(?=.*?[0-9])/).withMessage('At least one Number')
            .matches(/(?=.*?[#?!@$%^&*-])/).withMessage('At least one special character')
    ],

    function (req, res) {
        const errors = validationResult(req,)
        const data = matchedData(req);

        // const userExit = User.findOne({ email:  req.body.email  })


        if (!errors.isEmpty()) {
            try {
                return res.status(422).json({
                    status: false,
                    method: "POST",
                    message: 'Form Validation Error..!',
                    errors: errors.mapped()
                })


            }
            catch (errors) {
                console.log("UserController Error", errors);
            }
        }

        // If fields valid, then check unwanted fields.
        if (Object.keys(data).length !== Object.keys(req.body).length
            || !Object.keys(req.body).includes('username' || 'email' || 'password')
        ) {
            return res.status(400).send({
                status: 'error',
                message: 'Invalid request body.',
            });
        }
        const user = new User({ ...req.body })
        user.save().then(() => {
            return res.status(201).json({
                status: true,
                method: "POST",
                message: 'User Data Saved Successfully...',
                data: req.body,
            });
        })
            .catch((error) => {

                // Set custom error for unique keys
                let errMsg;
                if (error.code == 11000) {
                    errMsg = Object.keys(error.keyValue)[0] + " already exists.";
                } else {
                    errMsg = error.message;
                }
                res.status(400).json({ status: "true", statusText: "Duplicate Request", message: errMsg });
            });



    }
)


//module export 
module.exports = router 
