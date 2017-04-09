'use strict';
const connection = require('./connection');

module.exports = class AddressesDao {

  createBillingAddress(params) {
    return connection.queryAsync('
      insert into billing_address (
        firstName,
        lastName,
        addressLine1,
        addressLine2,
        city,
        state,
        zip,
        phone,
        email,
        userId
      ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        params.firstName,
        params.lastName,
        params.addressLine1,
        params.addressLine2,
        params.city,
        params.state,
        params.zip,
        params.phone,
        params.email,
        params.userId
      ]);
  }

  updateBillingAddress(id, params) {
    return connection.queryAsync('
      update billing_address set
        firstName=?,
        lastName=?,
        addressLine1=?,
        addressLine2=?,
        city=?,
        state=?,
        zip=?,
        phone=?,
        email=?
        userId=? where id=?', [
          params.firstName,
          params.lastName,
          params.addressLine1,
          params.addressLine2,
          params.city,
          params.state,
          params.zip,
          params.phone,
          params.email,
          params.userId,
          id
      ]);
  }

  createShippingAddress(params) {
    return connection.queryAsync('
      insert into shipping_address (
        firstName,
        lastName,
        addressLine1,
        addressLine2,
        city,
        state,
        zip,
        userId
      ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        params.firstName,
        params.lastName,
        params.addressLine1,
        params.addressLine2,
        params.city,
        params.state,
        params.zip,
        params.userId
      ]);
  }

  updateShippingAddress(id, params) {
    return connection.queryAsync('
      update shipping_address set
        firstName=?,
        lastName=?,
        addressLine1=?,
        addressLine2=?,
        city=?,
        state=?,
        zip=?
        userId=? where id=?', [
          params.firstName,
          params.lastName,
          params.addressLine1,
          params.addressLine2,
          params.city,
          params.state,
          params.zip,
          params.userId,
          id
      ]);
  }
}
