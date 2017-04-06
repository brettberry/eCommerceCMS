'use strict';

const connection = require('./connection');

module.exports = class ProductsDao {

  findAll() {
    return connection.queryAsync('select * from product');
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
