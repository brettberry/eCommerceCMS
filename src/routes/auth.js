
const express = require('express');
const passport = require('../passport');
const UsersDao = require('../dao/UsersDao');
const dao = new UsersDao();

const router = express.Router();

router.post('/login', passport.authenticate('basic'), (req, res) => {
  res.json({ success: true });
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  req.logout();
  res.json({ success: true });
});

module.exports = router;
