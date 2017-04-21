
//docs: http://docs.ecommercecms.apiary.io/#reference

const express = require('express');
const OrdersDao = require('../dao/OrdersDao');
const dao = new OrdersDao();

const router = express.Router();

// Find all orders
router.get('/', (req, res) => {
  dao.findAllOrders()
    .then(orders => res.json(orders))
    .catch(error => res.status(500).json(error));
});

// Find order by order id
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

// Find products related to order id
router.get('/:orderId/products', (req, res) => {
  const orderId = req.params.orderId;
  dao.findOrderedProductsByOrderId(orderId)
    .then(orderId => {
      if (orderId) {
        return res.json(orderId);
      }
      return sendStatus(404);
    })
    .catch(error => res.status(500).json(error));
});

// Create an order
router.post('/', (req, res) => {
  const body = req.body;
  dao.createOrder({
      userId: body.userId,
      total: body.total
    })
    .then(() => res.json({ success: true }))
    .catch(error => res.json(error));
});

// Delete an order by id
router.delete('/:orderId', (req, res) => {
  const orderId = req.params.id;
  connection.query('delete from order where orderId=?', [orderId], (error) => {
    if (error) {
      return res.json(error);
    }
    return res.json({
      success: true
    })
  })
});

module.exports = router;
