const mysql = require('./db.js');

const User = function (user) {
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
};

User.create = (newUser, result) => {
  // execute() my be the better then using query()
  mysql.query('INSERT INTO users SET ?', newUser, (err, res) => {
    if (err) {
      console.error(err);
      result(err, null);
      return;
    }

    console.log(`Create user: ${JSON.stringify({ id: res.insertId, ...newUser })}`);
    result(null, { id: res.insertId, ...newUser });
  });
};

module.exports = User;
