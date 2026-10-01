const fs = require('fs/promises');
const path = require('path');

const dbPath = path.join(__dirname, '../db.json');

async function fetchDbData() {
  const contents = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(contents);
}

async function saveDbData(items) {
  await fs.writeFile(dbPath, JSON.stringify(items));
}

module.exports = { fetchDbData, saveDbData };
