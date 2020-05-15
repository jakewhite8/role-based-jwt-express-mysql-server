module.exports = (connection) => {
  const Role = function (role) {
    this.role = role;
  };

  Role.create = (newRole) => {
    const role = new Role(newRole);
    connection.query('INSERT INTO roles SET ?', role, (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Created new role: ${JSON.stringify({ id: res.insertId, ...role })}`);
    });
  };
  
  return Role;
};
