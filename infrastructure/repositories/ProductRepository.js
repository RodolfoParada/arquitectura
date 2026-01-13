// 📁 infrastructure/repositories/ProductRepository.js
class ProductRepository {
  constructor(database) {
    this.db = database;
  }

  findById(id) {
    return this.db.products.find(p => p.id === id);
  }

  save(product) {
    if (product.id) {
      // Update
      this.db.products.update(product);
    } else {
      // Insert
      product.id = Date.now();
      this.db.products.insert(product);
    }
    return product;
  }
}

module.exports = ProductRepository;

