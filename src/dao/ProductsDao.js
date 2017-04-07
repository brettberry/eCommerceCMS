'use strict';

const connection = require('./connection');

module.exports = class ProductsDao {

  findAll() {
    return connection.queryAsync('select * from product')
      .then(rows => rows.map(row => formatProduct(row)));
  }

  findById(id) {
    return connection.queryAsync('select * from product where id=?', [id])
      .then(rows => rows.length ? formatProduct(rows[0]) : null);
  }

  findByPathName(pathName) {
    return connection.queryAsync('select * from product where pathName=?', [pathName])
      .then(rows => rows.length ? formatProduct(rows[0]) : null);
  }

  createProduct(params) {
    return connection.queryAsync(`
      insert into product (
        fullName,
        pathName,
        priceAmount,
        priceDiscount,
        description,
        category
      ) values (?, ?, ?, ?, ?, ?)`, [
        params.fullName,
        params.pathName,
        params.price.amount,
        params.price.discount,
        params.description,
        params.category
      ]);
  }

  updateProduct(id, params) {
    return connection.queryAsync('
      update product set
        fullName=?,
        pathName=?,
        priceAmount=?,
        priceDiscount=?,
        description=?,
        category=? where id=?', [
          params.fullName,
          params.pathName,
          params.price.amount,
          params.price.discount,
          params.description,
          params.category,
          id
      ]);
  }

  deleteProduct(id) {
    return connection.queryAsync('delete from product where id=?', [id])
  }
}

function formatProduct(product) {
  return {
    fullName: product.fullName,
    pathName: product.pathName,
    description: product.description,
    category: product.category,
    price: {
      amount: product.priceAmount,
      discount: product.priceDiscount
    }
  }
}
