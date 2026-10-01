const express = require('express');

const {
    handleGetAllProducts,
    handleGetSpecificProduct,
    handlePostProduct,
    handlePutProduct,
    handlePatchProduct,
    handleDeleteProduct
} = require('../controllers/productController');

const { performCacheCheck } = require('../middleware/cacheMiddleware');

const apiRouter = express.Router();

apiRouter.get('/products', performCacheCheck, handleGetAllProducts);
apiRouter.get('/products/:id', performCacheCheck, handleGetSpecificProduct);
apiRouter.post('/products', handlePostProduct);
apiRouter.put('/products/:id', handlePutProduct);
apiRouter.patch('/products/:id', handlePatchProduct);
apiRouter.delete('/products/:id', handleDeleteProduct);

module.exports = apiRouter;