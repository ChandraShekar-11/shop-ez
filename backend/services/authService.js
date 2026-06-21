const User = require('../models/User');

class AuthService {
  static async registerUser(data) {
    const { name, email, password } = data;

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      const error = new Error('User already exists');
      error.statusCode = 400;
      throw error;
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    return user;
  }

  static async loginUser(email, password) {
    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    return user;
  }
}

module.exports = AuthService;
