'use strict';
const connection = require('./connection');

module.exports = class UsersDao {

  findAllUsers(limit, offset) {
    return connection.queryAsync('select * from user limit ? offset ?', [limit || 25, offset || 0]);
  }

  findUserById(id){
    return connection.queryAsync('select * from user where id=?', [id])
      .then(rows => rows.length ? rows[0] : null);
  }

  findUserByEmail(email) {
    return connection.queryAsync('select * from user where email=?', [email])
      .then(rows => rows.length ? rows[0] : null);
  }

  findUsersByRole(role) {
    return connection.queryAsync('select * from user where role=?', [role])
      .then(rows => rows.length ? rows[0] : null);
  }

  createUser(params) {
    return connection.queryAsync(`
      insert into user (
        email,
        passwordHash,
        roleId
      ) values (?, ?, ?)`, [
        params.email,
        params.passwordHash,
        params.roleId
      ]);
  }

  updateUserById(id, params) {
    return connection.queryAsync(`
      update user set
        email=?,
        passwordHash=?,
        roleId=? where id=?`, [
          params.email,
          params.passwordHash,
          params.roleId,
          id
      ]);
  }

  deleteUserById(id) {
    return connection.queryAsync('delete from user where id=?', [id]);
  }
}
