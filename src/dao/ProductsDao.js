'use strict';

const _ = require('lodash');
const connection = require('./connection');

module.exports = class ProductsDao {

  findAll(limit, offset) {
    return connection.queryAsync({
      sql: `select p.*, m.* from product p
              left join product_media pm on p.id = pm.productId
              left join media m on m.id = pm.mediaId
            limit ? offset ?`,
      values: [limit || 100, offset || 0],
      nestTables: true
    })
    .then(rows => {
      const productGroups = _.groupBy(rows, row => row.p.id);
      return _.map(productGroups, group => {
        const product = group[0].p;
        const media = _.uniq(group.map(row => row.m.url));
        return formatProduct(product, media);
      });
    });
  }

  findById(id) {
    return connection.queryAsync({
        sql: `select p.*, m.*, t.* from product p
                left join product_media pm on p.id = pm.productId
                left join media m on m.id = pm.mediaId
                left join product_tag pt on p.id = pt.productId
                left join tag t on t.id = pt.tagId
              where p.id=?`,
        values: [id],
        nestTables: true
      })
      .then(rows => {
        if (!rows.length) {
          return null;
        }
        const product = rows[0].p;
        const media = _.uniq(rows.map(row => row.m.url));
        const tags = _.uniq(rows.map(row => row.t.pathName));
        return formatProduct(product, media, tags);
      });
  }

  findByPathName(pathName) {
    return connection.queryAsync({
        sql: `select p.*, m.* from product p
                left join product_media pm on p.id = pm.productId
                left join media m on m.id = pm.mediaId
              where p.pathName=?`,
        values: [pathName],
        nestTables: true
      })
      .then(rows => {
        if (!rows.length) {
          return null;
        }
        const product = rows[0].p;
        const media = _.uniq(rows.map(row => row.m.url));
        return formatProduct(product, media);
      });
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
    return connection.queryAsync(`
      update product set
        fullName=?,
        pathName=?,
        priceAmount=?,
        priceDiscount=?,
        description=?,
        category=? where id=?`, [
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

function formatProduct(product, media, tags) {
  return {
    id: product.id,
    fullName: product.fullName,
    pathName: product.pathName,
    description: product.description,
    category: product.category,
    price: {
      amount: product.priceAmount,
      discount: product.priceDiscount
    },
    media: media || [],
    tags: tags || []
  }
}
