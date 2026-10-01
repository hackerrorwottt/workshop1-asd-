const { readData,writeData } = require("../database/productDatabase");

async function delay() {
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 1500);
  });

  return await readData();
}

async function getProducts() {
  return await delay();
}

async function getProductsById(id) {
  let data = await delay();

  return data.find((x) => x.id === id);
}

async function createProduct(product){
    let data = await readData()
    data.push(product)
    
    await writeData(data)

    return product;
}

async function updateProduct(id,product){
  let data = await readData()

  let index = data.findIndex((x)=> x.id === id);

  if(index === -1){
    return;
  }

  data[index] = product;

  await writeData(data);
  return product;
}

async function patchProduct(id,product){
  let data = await readData();

  let index = data.findIndex((x)=> x.id === id);

  if(index === -1){
    return;
  }

  data[index] = {...data[index],...product};

  await writeData(data);

  return data[index];
}

async function deleteProduct(id){
  let data = await readData()

  let index = data.findIndex((x)=> x.id === id);

  if(index === -1){
    return 
  }

  let deletedProduct = data[index]

  data.splice(index,1);

  await writeData(data);
  return deletedProduct;
}

module.exports = {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct
};
