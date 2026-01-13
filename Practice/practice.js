// Aplicación completa de arquitectura en capas:

// 📁 domain/entities/Product.js
class Product {
  constructor(id, name, price, category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
  }

  updatePrice(newPrice) {
    if (newPrice <= 0) throw new Error('Precio debe ser positivo');
    this.price = newPrice;
  }
}

// 📁 domain/services/ProductService.js
class ProductService {
  constructor(productRepository, categoryValidator) {
    this.productRepository = productRepository;
    this.categoryValidator = categoryValidator;
  }

  async createProduct(productData) {
    this.categoryValidator.validate(productData.category);

    const product = new Product(
      null,
      productData.name,
      productData.price,
      productData.category
    );

    return await this.productRepository.save(product);
  }

  async updateProductPrice(productId, newPrice) {
    const product = await this.productRepository.findById(productId);
    product.updatePrice(newPrice);
    return await this.productRepository.save(product);
  }
}

// 📁 infrastructure/repositories/ProductRepository.js
class ProductRepository {
  constructor(database) {
    this.db = database;
  }

  async findById(id) {
    return await this.db.products.find(p => p.id === id);
  }

  async save(product) {
    if (product.id) {
      // Update
      await this.db.products.update(product);
    } else {
      // Insert
      product.id = Date.now();
      await this.db.products.insert(product);
    }
    return product;
  }
}

// 📁 interfaces/controllers/ProductController.js
class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  async createProduct(req, res) {
    try {
      const product = await this.productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updatePrice(req, res) {
    try {
      const { id } = req.params;
      const { price } = req.body;

      const product = await this.productService.updateProductPrice(id, price);
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
// Requerimientos:
// # Crear estructura de carpetas
// mkdir -p domain/entities domain/services
// mkdir -p infrastructure/repositories
// mkdir -p interfaces/controllers
// mkdir -p application/use-cases

// # Instalar dependencias mínimas (si se usa un contenedor DI)
// npm install --save-dev inversify reflect-metadata