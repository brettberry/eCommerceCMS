'use strict';

const connection = require('./connection');

module.exports = class ProductsDao {

  findAll() {
    return connection.queryAsync('select * from product');
  }

  findById(id) {
    return connection.queryAsync('select * from product where id=?', [id])
      .then(rows => rows.length ? rows[0] : null);
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
        params.priceAmount,
        params.priceDiscount,
        params.description,
        params.category
      ]);
  }

}
