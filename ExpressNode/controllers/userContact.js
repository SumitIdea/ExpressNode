jwt = require('jsonwebtoken'),
bcrypt = require('bcrypt')
const UserBody = require('../models/Contact')

exports.contact = function(req, res) {
var newUser = new UserBody({ ...req.body })
newUser.save(function(err, user) {
  if (err) {
    return res.status(400).send({
      message: err
    });
  } else {
    return res.json(user);
  }
});
};