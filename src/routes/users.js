const express = require('express');
const UsersDao = require('../dao/UsersDao');
const OrdersDao = require('../dao/OrdersDao');
const passport = require('../passport');
const dao = new UsersDao();
const ordersDao = new OrdersDao();

const router = express.Router();

// Find all users
router.get('/', (req, res) => {
  dao.findAllUsers()
    .then(users => res.json(users))
    .catch(error => res.status(500).json(error));
});

// Find a user by user id
router.get('/:id(\\d+)', (req, res) => {
  const id = req.params.id;
  dao.findUserById(id)
    .then(user => {
      if (user) {
        return res.json(user);
      }
      return res.sendStatus(404);
    })
    .catch(error => res.status(500).json(error));
});

// Get current user
router.get('/me', (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }
  return res.json(req.user);
});

// Find all user's orders by user id
router.get('/:userId/orders', (req, res) => {
  const userId = req.params.userId;
  orderDao.findAllOrdersByUserId(userId)
    .then(userId => {
      if (userId) {
        return res.json(userId);
      }
      return sendStatus(404);
    })
    .catch(error => res.status(500).json(error));
});

// Find user by email address
router.get('/:email', (req, res) => {
  const email = req.params.email;
  dao.findUserByEmail(email)
  .then(user => {
    if (user) {
      return res.json(user);
    }
    return res.sendStatus(404);
  })
  .catch(error => res.status(500).json(error));
});

// Create new user
router.post('/', (req, res) => {
  const body = req.body;
  dao.createUser({
      email: body.email,
      passwordHash: body.password
    })
    .then(() => res.json({ success: true }))
    .catch(error => res.status(500).json(error));
});

// Edit user info by user id
router.put('/:id', (req, res) => {
  const body = req.body;
  const id = req.params.id;
  dao.updateUserById(id, {
      email: body.email,
      passwordHash: body.password,
      roleId: body.roleId
    })
    .then(() => res.json({ success: true }))
    .catch(error => res.status(500).json(error));
});

module.exports = router;
