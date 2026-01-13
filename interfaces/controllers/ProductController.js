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
      const id = Number(req.params.id);
      const { price } = req.body;

      const product = await this.productService.updateProductPrice(id, price);
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ProductController;

