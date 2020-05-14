const mysql = require('./db.js');

const User = function (user) {
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
};

User.create = (newUser, result) => {
  // execute() may be the better then using query()
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

User.findOne = (email, result) => {
  mysql.query('SELECT * FROM users WHERE email = ?', email, (err, res) => {
    if (err) {
      console.log('Error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found user: ', res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: 'not found' }, null);
  });
};

module.exports = User;
