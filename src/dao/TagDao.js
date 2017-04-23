'use strict';
const connection = require('./connection');

module.exports = class TagDao {

  createTag(tagName, pathName) {
    return connection.queryAsync(
      'insert into tag (tagName, pathName) values (?, ?)',
      [tagName, pathName]
    );
  }

  createProductTag(tagId, productId) {
    return connection.queryAsync('insert into product_tag (tagId, productId) values (?,?)',
      [tagId, productId]);
  }
}
