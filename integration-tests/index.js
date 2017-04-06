const fetch = require('isomorphic-fetch');
const isArray = require('lodash/isArray');
const shortid = require('shortid');

describe('integration tests', () => {
  it('creates a product', (done) => {
    fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "fullName": `test${shortid()}`,
        "pathName": `test${shortid()}`,
        "priceAmount": "test",
        "priceDiscount": "test",
        "description": "test",
        "category": "test"
      })
    })
    .then(res => res.json())
    .then(body => {
      expect(body.success).toBe(true);
      done();
    });
  });

  it('gets products', (done) => {
    fetch('http://localhost:3000/products')
    .then(res => res.json())
    .then(body => {
      expect(isArray(body)).toBe(true);
      expect(body[0]).toBeDefined();
      expect(body[0].fullName).toBeDefined();
      done();
    });
  });
});
