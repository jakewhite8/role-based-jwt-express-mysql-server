const bcrypt = require('bcryptjs');

const User = require('../models/user.model.js');


exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty',
    });
  }

  // Create User
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  // Need to first verify if there is a user with this username first
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
