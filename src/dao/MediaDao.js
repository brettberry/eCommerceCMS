'use strict';
const connection = require('./connection');

module.exports = class MediaDao {

  createMedia(url) {
    return connection.queryAsync('insert into media (url) values (?)', [url]);
  }

  createProductMedia(mediaId, productId) {
    return connection.queryAsync('insert into product_media (mediaId, productId) values (?,?)',
      [mediaId, productId]);
  }
}
