const fs = require('fs');

async function returnDataUB() {
  try {
    const data = await fs.promises.readFile('data/UB_workers.json', 'utf8');
    const workers = JSON.parse(data);
    return workers;
  } catch (error) {
    console.error('Error reading workers_UB.json:', error);
    throw error;
  }
}

async function returnDataDR() {
  try {
    const data = await fs.promises.readFile('data/DR_workers.json', 'utf8');
    const workers = JSON.parse(data);
    return workers;
  } catch (error) {
    console.error('Error reading workers_DR.json:', error);
    throw error;
  }
}

module.exports = {
  returnDataUB,
  returnDataDR
};