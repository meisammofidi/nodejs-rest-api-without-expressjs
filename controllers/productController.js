const Product = require('../models/productModel');
const { getBodyRequest } = require('../utils');

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

//@ desc    Create a Product
//@ route   POST  /api/products/:id
async function createProduct(req, res) {
  const body = await getBodyRequest(req);
  if (!body) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.parse({ mesage: 'Request body does not have value' }));
  }
  const { name, price, category } = body;
  const product = { name, price, category };
  const newProduct = await Product.create(product);
  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(newProduct));
}

//@ desc    Update a Product
//@ route   PUT  /api/products/:id
async function updateProduct(req, res) {
  const id = req.url.split('/')[3];
  const product = await Product.findById(Number(id));
  if (!product) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.parse({ mesage: 'Product is not found' }));
  }

  const body = await getBodyRequest(req);
  const { name, price, category } = body;

  const productData = {
    name: name || product.name,
    price: price || product.price,
    category: category || product.category,
  };

  const updatedProduct = await Product.update(Number(id), productData);

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      mesage: 'Product has been updated successfully',
      data: updatedProduct,
    })
  );
}

//@ desc    Delete a Product
//@ route   Delete  /api/products/:id
async function deleteProduct(req, res) {
  const id = req.url.split('/')[3]
  await Product.remove(id)
  res.end('Your product has been removed successfully')
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
