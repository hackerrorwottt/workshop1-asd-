const {
    getProducts,
    getProductsById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
} = require('../services/productService')
const {saveCache,clearCache} = require('../middleware/cacheMiddleware')


async function getAllProducts(req,res){
    try{
        let data = await getProducts();
        saveCache(req.url,data)

        return res.json(data)
    }catch(err){
        console.log(err)
    }
}


async function getSpecificProduct(req,res){
    try{
        let id = Number(req.params.id);
        let specificData = await getProductsById(id)

        saveCache(req.url,specificData)
        res.json(specificData);
    } catch(err){
        console.log(err)
    }
}


async function postProduct(req,res){
    try{
        let product = req.body;

        let data = await createProduct(product);

        clearCache()
        res.json(data)
    }catch(err){
        console.log(err)
    }
}

async function putProduct(req,res){
    try{
        let id = Number(req.params.id)
        let product = req.body;

        let data = await updateProduct(id,product);

        if(!data){
            return res.status(404).json({message:"Product not found"})
        }

        clearCache();

        res.json(data);

    }catch(err){
        console.log(err);
    }
}

async function patchProductController(req,res){
    try{
        let id = Number(req.params.id);
        let product = req.body;

        let data = await patchProduct(id,product);


        if(!data){
            return res.status(404).json({message:"Product not found"});

        }

        clearCache();

        res.json(data);

    }catch(err){
        console.log(err);
    }
}

async function deleteProductController(req,res){

    try{
        let id = Number(req.params.id)

        let data = await deleteProduct(id)

        if(!data){
            return res.status(404).json({message:"Product not found"})

        }
        clearCache()
        res.json(data)
    }catch(err){
        console.log(err);
    }
}


module.exports = {
    getAllProducts,
    getSpecificProduct,
    postProduct,
    putProduct,
    patchProductController,
    deleteProductController
};