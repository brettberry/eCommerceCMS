const express = require('express');
const OrdersDao = require('../dao/OrdersDao');
const dao = new OrdersDao();

const router = express.Router();

router.get('/', (req, res) => {
  dao.findAllOrders()
    .then(orders => res.json(orders))
    .catch(error => res.json(error));
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  dao.findOrderById(id)
    .then(order => {
      if (order) {
        return res.json(order);
      }
      return res.sendStatus(404);
    })
    .catch(error => res.status(500).json(error));
});



module.exports = router;
