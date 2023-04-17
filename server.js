const http = require('http');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('./controllers/productController');

const server = http.createServer((req, res) => {
  const { url, header, method } = req;
  if (url === '/') {
    res.writeHead(200, 'Content-Type', 'application/json');
    res.end(`You are connected to server successfully!`);
  } else if (url === '/api/products' && method === 'GET') {
    getProducts(req, res);
  } else if (url.match(/\/api\/products\/([0-9]+)/) && method === 'GET') {
    getProduct(req, res);
  } else if (url === '/api/products' && method === 'POST') {
    createProduct(req, res);
  } else if (url.match(/\/api\/products\/([0-9]+)/) && method === 'PUT') {
    updateProduct(req, res);
  } else if (url.match(/\/api\/products\/([0-9]+)/) && method === 'DELETE') {
    deleteProduct(req, res);
  } else {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Page not found.');
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running at port ${PORT}`));
