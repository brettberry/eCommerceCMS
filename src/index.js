const express = require('express');
const bodyParser = require('body-parser');
const products = require('./routes/products');

const app = express();
app.use(bodyParser.json());
app.use('/products', products);
app.listen(3000);
