const OrderService = require('../services/orderService');

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private
exports.addOrderItems = async (req, res, next) => {
  try {
    const { cartItems, shippingAddress } = req.body;
    const order = await OrderService.createOrder(req.user._id, cartItems, shippingAddress);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/v1/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await OrderService.getUserOrders(req.user._id);
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    next(error);
  }
};
