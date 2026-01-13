const express = require('express');
const app = express();

/**
 * ==========================
 * Middlewares base
 * ==========================
 */
app.use(express.json());

/**
 * ==========================
 * 🔒 SANITIZACIÓN DE URL
 * Soluciona requests con %0A, \n, \r
 * ==========================
 */
app.use((req, res, next) => {
  const originalUrl = req.url;
  const cleanUrl = decodeURIComponent(originalUrl).replace(/[\r\n]/g, '');

  if (cleanUrl !== originalUrl) {
    console.warn('URL SANITIZADA:', JSON.stringify(originalUrl), '→', JSON.stringify(cleanUrl));
    req.url = cleanUrl;
  }

  console.log('REQUEST:', req.method, req.url);
  console.log('RAW URL:', JSON.stringify(req.url));

  next();
});

/**
 * ==========================
 * Fake Database (In-Memory)
 * ==========================
 */
const database = {
  products: {
    data: [],
    find: fn => database.products.data.find(fn),
    insert: p => database.products.data.push(p),
    update: p => {
      const index = database.products.data.findIndex(x => x.id === p.id);
      if (index === -1) {
        throw new Error('Producto no existe en DB');
      }
      database.products.data[index] = p;
    }
  }
};

/**
 * ==========================
 * Dependencies
 * ==========================
 */
const ProductRepository = require('./infrastructure/repositories/ProductRepository');
const ProductService = require('./domain/services/ProductService');
const ProductController = require('./interfaces/controllers/ProductController');
const CategoryValidator = require('./infrastructure/validators/CategoryValidator');

/**
 * ==========================
 * Instancias
 * ==========================
 */
const repository = new ProductRepository(database);
const categoryValidator = new CategoryValidator();
const service = new ProductService(repository, categoryValidator);
const controller = new ProductController(service);

/**
 * ==========================
 * Routes
 * ==========================
 */
app.post('/products', (req, res) => controller.createProduct(req, res));
app.put('/products/:id/price', (req, res) => controller.updatePrice(req, res));

/**
 * ==========================
 * Health check (opcional)
 * ==========================
 */
app.get('/', (req, res) => {
  res.send('API OK');
});

/**
 * ==========================
 * Error handlers globales
 * ==========================
 */
process.on('uncaughtException', err => {
  console.error('UNCAUGHT EXCEPTION:', err);
});

process.on('unhandledRejection', err => {
  console.error('UNHANDLED PROMISE:', err);
});

/**
 * ==========================
 * Server
 * ==========================
 */
const PORT = 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
