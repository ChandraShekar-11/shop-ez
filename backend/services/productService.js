const Product = require('../models/Product');

class ProductService {
  static async getAllProducts() {
    return await Product.find({});
  }

  static async getProductById(id) {
    return await Product.findById(id);
  }

  static async createProduct(data) {
    return await Product.create(data);
  }
}

module.exports = ProductService;
