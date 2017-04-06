const express = require('express');
const ProductsDao = require('../dao/ProductsDao');
const dao = new ProductsDao();

const router = express.Router();

// Product Table Requests

router.get('/', (req, res) => {
  dao.findAll()
    .then(products => res.json(products))
    .catch(error => res.json(error));
});

router.post('/', (req, res) => {
  const body = req.body;
  dao.createProduct({
    fullName: body.fullName,
    pathName: body.pathName,
    priceAmount: body.priceAmount,
    priceDiscount: body.priceDiscount,
    description: body.description,
    category: body.category
  })
    .then(() => res.json({ success: true }))
    .catch(error => res.json(error));
});

// Update and delete product by id

router.put('/:id', (req, res) => {
  const name = req.body.name;
  const id = req.params.id;
  connection.query('update product set name=? where id=?', [name, id], (error) => {
    if (error) {
      return res.json(error);
    }
    return res.json({
      success: true
    })
  })
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  connection.query('delete from product where id=?', [id], (error) => {
    if (error) {
      return res.json(error);
    }
    return res.json({
      success: true
    })
  })
});

module.exports = router;
