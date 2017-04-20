const express = require('express');
const UsersDao = require('../dao/UsersDao');
const dao = new UsersDao();
const orderDao = new OrderDao();

const router = express.Router();

router.get('/', (req, res) => {
  dao.findAllUsers()
    .then(users => res.json(users))
    .catch(error => res.status(500).json(error));
});

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

router.get('/:userId/orders', (req, res) => {
  const userId = req.params.userId;
  orderDao.findAllOrdersByUserId(userId);
    .then(userId => {
      if (userId) {
        return res.json(userId);
      }
      return sendStatus(404;)
    })
    .catch(error => res.status(500).json(error));
});

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
