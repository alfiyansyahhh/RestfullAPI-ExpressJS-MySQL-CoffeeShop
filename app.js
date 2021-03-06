const bodyParser = require('body-parser');
const express = require('express');

const productRouter = require('./src/routers/products');
const usersRouter = require('./src/routers/users');
const categoryRouter = require('./src/routers/category');
// const db = require('./src/config/db')

const app = express();
app.use(bodyParser.json());
app.use(productRouter);
app.use(usersRouter);
app.use(categoryRouter);

app.listen(8000, () => {
  console.log('service running on port 8000');
});
