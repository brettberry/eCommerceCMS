const fs = require('fs');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const clc = require('cli-color');

const passport = require('./passport');
const products = require('./routes/products');
const orders = require('./routes/orders');
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();

app.use(cors({
    origin: true,
    credentials: true,
    preflightContinue: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan('combined'));

//TODO: use a real secret secret
app.use(session({
  secret: 'test',
  saveUninitialized: false,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/products', products);
app.use('/orders', orders);
app.use('/users', users);
app.use('/auth', auth);
app.listen(3000, () => {
  const header = fs.readFileSync('./header.txt');
  const pinkify = clc.xterm(199);
  console.log(pinkify(header.toString()));
  console.log(pinkify('listening on port http://localhost:3000'));
});
