
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const UsersDao = require('./dao/UsersDao');
const usersDao = new UsersDao();

passport.use(new BasicStrategy(
  (email, password, callback) => {
    usersDao.findUserByEmail(email)
      .then(user => {
        if (!user) {
          callback(null, false);
        }
        else if (user.passwordHash !== password) {
          callback(null, false);
        }
        callback(null, user);
      })
      .catch(error => callback(error));
  }
));

passport.serializeUser((user, callback) => {
  callback(null, user.id);
});

passport.deserializeUser((id, callback) => {
  usersDao.findUserById(id)
    .then(user => {
      if (!user) {
        throw new Error(`failed to find user with ${id}`);
      }
      callback(null, user);
    })
    .catch(error => callback(error));
});

module.exports = passport;
