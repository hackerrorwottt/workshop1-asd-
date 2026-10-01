const { fetchDbData, saveDbData } = require("../database/productDatabase");

async function waitDelay() {
  await new Promise((res) => {
    setTimeout(res, 1500);
  });
  return await fetchDbData();
}

async function retrieveAllProducts() {
  return await waitDelay();
}

async function retrieveProductById(prodId) {
  const records = await waitDelay();
  return records.find((item) => item.id === prodId);
}

async function insertProduct(newItem) {
  const records = await fetchDbData();
  records.push(newItem);
  await saveDbData(records);
  return newItem;
}

async function replaceProduct(prodId, updatedItem) {
  const records = await fetchDbData();
  const idx = records.findIndex((item) => item.id === prodId);
  if (idx === -1) return null;
  
  records[idx] = updatedItem;
  await saveDbData(records);
  return updatedItem;
}

async function modifyProduct(prodId, partialItem) {
  const records = await fetchDbData();
  const idx = records.findIndex((item) => item.id === prodId);
  if (idx === -1) return null;

  records[idx] = { ...records[idx], ...partialItem };
  await saveDbData(records);
  return records[idx];
}

async function removeProduct(prodId) {
  const records = await fetchDbData();
  const idx = records.findIndex((item) => item.id === prodId);
  if (idx === -1) return null;

  const itemToRemove = records[idx];
  records.splice(idx, 1);
  await saveDbData(records);
  return itemToRemove;
}

module.exports = {
  retrieveAllProducts,
  retrieveProductById,
  insertProduct,
  replaceProduct,
  modifyProduct,
  removeProduct
};
