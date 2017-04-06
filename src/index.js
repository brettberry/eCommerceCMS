const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const products = require('./routes/products');

const app = express();

app.use(cors({
    origin: true,
    credentials: true,
    preflightContinue: true
}));
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use('/products', products);
app.listen(3000, () => console.log('listening on port http://localhost:3000'));
