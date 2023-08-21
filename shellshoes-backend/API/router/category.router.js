const express = require('express');
const categoryRouter = express.Router();
const categoryController = require('../controller/category.controller');
const uploadMiddleware = require('../../middleware/upload.mid');
const tokenMiddleware = require('../../middleware/token.mid');

categoryRouter.get('/api/category/all', categoryController.getAllCategory);
categoryRouter.post(
    '/api/category/create',
    tokenMiddleware.verifyTokenAndAdmin,
    uploadMiddleware.single('image'),
    categoryController.createNewCategory,
);
categoryRouter.put(
    '/api/category/edit/:_id',
    tokenMiddleware.verifyTokenAndAdmin,
    uploadMiddleware.single('image'),
    categoryController.updateCategory,
);

categoryRouter.delete(
    '/api/category/delete/:_id',
    tokenMiddleware.verifyTokenAndAdmin,
    categoryController.deleteCategory,
);

module.exports = categoryRouter;
