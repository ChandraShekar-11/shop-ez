const Order = require('../models/Order');
const Product = require('../models/Product');

class OrderService {
  static async createOrder(userId, cartItems, shippingAddress) {
    if (!cartItems || cartItems.length === 0) {
      const error = new Error('No order items');
      error.statusCode = 400;
      throw error;
    }

    let totalAmount = 0;
    const orderProducts = [];

    // Verify prices from DB to prevent frontend tampering
    for (const item of cartItems) {
      const product = await Product.findById(item.product._id);
      if (!product) {
        const error = new Error(`Product not found: ${item.product._id}`);
        error.statusCode = 404;
        throw error;
      }
      if (product.stock < item.quantity) {
        const error = new Error(`Insufficient stock for product: ${product.name}`);
        error.statusCode = 400;
        throw error;
      }

      totalAmount += product.price * item.quantity;
      orderProducts.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });

      // Optional: Reduce stock
      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      user: userId,
      products: orderProducts,
      shippingAddress,
      totalAmount,
      paymentStatus: 'Completed', // Simulating payment success
    });

    return order;
  }

  static async getUserOrders(userId) {
    return await Order.find({ user: userId }).populate('products.product', 'name images');
  }
}

module.exports = OrderService;
