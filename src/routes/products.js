
// docs: http://docs.ecommercecms.apiary.io/#reference

const express = require('express');
const ProductsDao = require('../dao/ProductsDao');
const MediaDao = require('../dao/MediaDao');
const mediaDao = new MediaDao();
const dao = new ProductsDao();

const router = express.Router();

// Find all products
router.get('/', (req, res) => {
  dao.findAll()
    .then(products => res.json(products))
    .catch(error => res.json(error));
});

// Find a product by id
router.get('/:id(\\d+)', (req, res) => {
  const id = req.params.id;
  dao.findById(id)
    .then(product => res.json(product))
    .catch(error => res.json(error));
});

// Find a product by pathname
router.get('/:pathName', (req, res) => {
  const pathName = req.params.pathName;
  dao.findByPathName(pathName)
    .then(product => res.json(product))
    .catch(error => res.json(error));
});

// Create Product
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
    .then(mysqlResponse => {
      const id = mysqlResponse.insertId;
      res.json({ success: true, id: id });
    })
    .catch(error => res.json(error));
});

// Edit a product by id
router.put('/:id', (req, res) => {
  const body = req.body;
  const id = req.params.id;
  dao.updateProduct(id, {
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

// Remove a product by id
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  dao.deleteProduct(id)
  .then(() => res.json({ success: true }))
  .catch(error => res.json(error));
});

// Create a media object linked to a product id
router.post('/:id/media', (req, res) => {
  const productId = req.params.id;
  mediaDao.createMedia(req.body.url)
    .then(mysqlResponse => {
      const mediaId = mysqlResponse.insertId;
      return mediaDao.createProductMedia(mediaId, productId);
    })
    .then(() => res.json({ success: true }))
    .catch(error => res.json(error));
})

module.exports = router;
