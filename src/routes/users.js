const express = require('express');
const UsersDao = require('../dao/UsersDao');
const OrdersDao = require('../dao/OrdersDao');
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
})

// Find all User's orders by User Id
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

// Find User by Email Address
router.get('/:email'), (req, res) => {
  const email = req.params.email;
  dao.findUserByEmail(email)
  .then(user => {
    if (user) {
      return res.json(user);
    }
    return res.sendStatus(404);
  })
  .catch(error => res.status(500).json(error));
}

// Create New User
router.post('/', (req, res) => {
  const body = req.body;
  dao.createUser({
      email: body.email,
      passwordHash: body.passwordHash,
      roleId: body.roleId
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
      passwordHash: body.passwordHash,
      roleId: body.roleId
    })
    .then(() => res.json({ success: true }))
    .catch(error => res.status(500).json(error));
});

module.exports = router;
