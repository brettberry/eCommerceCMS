'use strict';
const connection = require('./connection');

module.exports = class OrdersDao {

  findAllOrders(limit, offset) {
    return connection.queryAsync('select * from `order` limit ? offset ?', [limit || 25, offset || 0]);
  }

  findAllOrdersByUserId(userId) {
    return connection.queryAsync('select * from `order` where userId=?', [userId]);
  }

  createOrder(params) {
    return connection.queryAsync(`
      insert into \`order\` (
        userId,
        total
      ) values (?, ?)`, [
        params.userId,
        params.total
      ]);
  }

  findOrderById(id) {
    return connection.queryAsync('select * from `order` where id=?', [id])
      .then(rows => rows.length ? rows[0] : null);
  }

  deleteOrder(id) {
    return connection.queryAsync('delete from `order` where id=?', [id]);
  }

  findOrderedProductsByOrderId(id) {
    return connection.queryAsync('select * from ordered_product where orderId=?', [id]);
  }
}
