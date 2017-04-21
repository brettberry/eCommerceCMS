
const express = require('express');
const passport = require('../passport');
const UsersDao = require('../dao/UsersDao');
const dao = new UsersDao();

const router = express.Router();

router.post('/login', passport.authenticate('basic', { session: false }), (req, res) => {
  console.log(req.user);
  res.json({ success: true });
});

router.post('/logout', (req, res) => {
  req.logout();
  res.json({ success: true });
});

module.exports = router;
