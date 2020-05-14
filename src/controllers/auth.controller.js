const bcrypt = require('bcryptjs');
const db = require('../models');

const User = db.user;

exports.signup = (req, res) => {
  // Save User to Database
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty',
    });
  }

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Error occured while creating the User',
      });
    } else {
      res.send(data);
    }
  });
};
