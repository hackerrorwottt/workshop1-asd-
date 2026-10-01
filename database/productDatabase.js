
const fs = require('fs/promises')
const path = require('path')

const filePath = path.join(__dirname,'../db.json')



async function readData() {
  let products = await fs.readFile(filePath, "utf-8");
  return JSON.parse(products);
}
async function writeData(products){
  await fs.writeFile(filePath,JSON.stringify(products))
}
module.exports = {readData,writeData}
