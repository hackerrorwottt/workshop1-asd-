const {
    retrieveAllProducts,
    retrieveProductById,
    insertProduct,
    replaceProduct,
    modifyProduct,
    removeProduct
} = require('../services/productService');
const { storeCacheItem, flushCache } = require('../middleware/cacheMiddleware');

async function handleGetAllProducts(req, res) {
    try {
        const records = await retrieveAllProducts();
        storeCacheItem(req.url, records);
        return res.json(records);
    } catch (error) {
        console.error(error);
    }
}

async function handleGetSpecificProduct(req, res) {
    try {
        const prodId = Number(req.params.id);
        const itemData = await retrieveProductById(prodId);
        storeCacheItem(req.url, itemData);
        res.json(itemData);
    } catch (error) {
        console.error(error);
    }
}

async function handlePostProduct(req, res) {
    try {
        const payload = req.body;
        const result = await insertProduct(payload);
        flushCache();
        res.json(result);
    } catch (error) {
        console.error(error);
    }
}

async function handlePutProduct(req, res) {
    try {
        const prodId = Number(req.params.id);
        const payload = req.body;
        const result = await replaceProduct(prodId, payload);
        if (!result) {
            return res.status(404).json({ message: "Item not found" });
        }
        flushCache();
        res.json(result);
    } catch (error) {
        console.error(error);
    }
}

async function handlePatchProduct(req, res) {
    try {
        const prodId = Number(req.params.id);
        const payload = req.body;
        const result = await modifyProduct(prodId, payload);
        if (!result) {
            return res.status(404).json({ message: "Item not found" });
        }
        flushCache();
        res.json(result);
    } catch (error) {
        console.error(error);
    }
}

async function handleDeleteProduct(req, res) {
    try {
        const prodId = Number(req.params.id);
        const result = await removeProduct(prodId);
        if (!result) {
            return res.status(404).json({ message: "Item not found" });
        }
        flushCache();
        res.json(result);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    handleGetAllProducts,
    handleGetSpecificProduct,
    handlePostProduct,
    handlePutProduct,
    handlePatchProduct,
    handleDeleteProduct
};