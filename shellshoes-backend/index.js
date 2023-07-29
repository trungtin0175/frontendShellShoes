const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connect = require('./config/index');
const dotenv = require('dotenv');
const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloundinary = require('multer-storage-cloudinary');

//const routerUser= require('./API/router/user.router')
const siteRouter = require('./API/router/site.router');
const userRouter = require('./API/router/user.router');
const productRouter = require('./API/router/product.router');
const categoryRouter = require('./API/router/category.router');
const orderRouter = require('./API/router/order.router');

const AccountModel = require('./models/user.model');
const ProductModel = require('./models/product.model');
const CategoryModel = require('./models/category.model');
const OrderModel = require('./models/order.model');
const DetailOrderModel = require('./models/detail-order.model');
const NoteModel = require('./models/note.model');
const PaymentModel = require('./models/payment.model');

// parse application/x-www-form-urlencoded
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
connect();

app.use(siteRouter);
app.use(userRouter);
app.use(productRouter);
app.use(categoryRouter);
app.use(orderRouter);
//app.use('/api/account/', AccountRouter)
app.listen(3000, () => {
    console.log(`Server started on port`);
});
