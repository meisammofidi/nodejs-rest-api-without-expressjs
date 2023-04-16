const products = require('../data/products.json');
const { v4: uuid } = require('uuid');
const { writeDataToFile } = require('../utils');

async function findAll() {
  return new Promise((resolve, reject) => {
    try {
      resolve(products);
    } catch (error) {
      reject(error);
    }
  });
}

async function findById(id) {
  return new Promise((resolve, reject) => {
    try {
      const product = products.find((p) => p.id === id);
      resolve(product);
    } catch (error) {
      reject(error);
    }
  });
}

async function create(product) {
  return new Promise((resolve, reject) => {
    try {
      const newProduct = { id: uuid(), ...product };
      products.push(newProduct);
      writeDataToFile('./data/products.json', products);
      resolve(newProduct);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  findAll,
  findById,
  create,
};
