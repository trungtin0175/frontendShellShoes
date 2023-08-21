const express = require('express');
const productRouter = express.Router();
const productController = require('../controller/product.controller');
const tokenMiddleware = require('../../middleware/token.mid');
const uploadMiddleware = require('../../middleware/upload.mid');

productRouter.get('/api/filterproduct', productController.filterProduct);
productRouter.get('/api/product/detail/:_id', productController.productDetail);
productRouter.get(
    '/api/allproduct',
    // tokenMiddleware.verifyTokenAndAdmin,
    productController.allProduct,
);
productRouter.post(
    '/api/newproduct',
    tokenMiddleware.verifyTokenAndAdmin,
    uploadMiddleware.single('image'),
    productController.createNewproduct,
);
productRouter.put(
    '/api/product/edit/:_id',
    tokenMiddleware.verifyTokenAndAdmin,
    uploadMiddleware.single('image'),
    productController.updateProduct,
);
productRouter.delete(
    '/api/product/delete/:_id',
    tokenMiddleware.verifyTokenAndAdmin,
    productController.deleteProduct,
);
productRouter.get('/api/search', productController.searchProduct);

module.exports = productRouter;
