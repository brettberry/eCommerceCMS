const express = require('express');
const ProductsDao = require('../dao/ProductsDao');
const dao = new ProductsDao();

const router = express.Router();

router.get('/', (req, res) => {
  dao.findAll()
    .then(products => res.json(products))
    .catch(error => res.json(error));
});

router.get('/:id(\\d+)', (req, res) => {
  const id = req.params.id;
  dao.findById(id)
    .then(product => res.json(product))
    .catch(error => res.json(error));
});

router.get('/:pathName', (req, res) => {
  const pathName = req.params.pathName;
  dao.findByPathName(pathName)
    .then(product => res.json(product))
    .catch(error => res.json(error));
});

router.post('/', (req, res) => {
  const body = req.body;
  dao.createProduct({
      fullName: body.fullName,
      pathName: body.pathName,
      price: {
        amount: body.price.amount,
        discount: body.price.discount
      },
      description: body.description,
      category: body.category
    })
    .then(() => res.json({ success: true }))
    .catch(error => res.json(error));
});

// TODO
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

// TODO
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
