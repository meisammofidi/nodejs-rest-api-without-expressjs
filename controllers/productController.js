const Product = require('../models/productModel');

/*
  @dec: Get all products
  @route: GET /api/products
*/
async function getProducts(req, res) {
  const products = await Product.findAll();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(products));
}

/*
  @dec: Get singal product
  @route: GET /api/products/:id
*/
async function getProduct(req, res) {
  const id = req.url.split('/')[3];
  const product = await Product.findById(Number(id));
  if (!product) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: 'Product not found' }));
  }
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(product));
}

async function createProduct(req, res) {
  const product = {
    name: 'Samsung Galexy S22',
    price: 1799,
    category: 'Electronics',
  };

  const newProduct = await Product.create(product);
  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(newProduct));
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
};
