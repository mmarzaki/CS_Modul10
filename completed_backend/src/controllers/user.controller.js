const UserService = require('../services/user.service');
const { AppError } = require('../middleware/errorHandler');
const redis = require('../database/redis');

class UserController {
  static async register(req, res, next) {
    try {
      const { name, username, email, phone, password } = req.body;
      const user = await UserService.register({ name, username, email, phone, password });
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        payload: user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const { token, user } = await UserService.login(email, password);
       // Return only user data (no token) for /user/login
      res.status(200).json({
        success: true,
        message: 'Login successful',
        payload: user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const { id, name, username, email, phone, password, balance } = req.body;
      const updatedUser = await UserService.updateProfile(id, { name, username, email, phone, password, balance });

      const cacheKey = `user:${email}`;
      await redis.del(cacheKey);

      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        payload: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTransactionHistory(req, res, next) {
    try {
      const userId = req.user.userId;
      const history = await UserService.getTransactionHistory(userId);
      res.status(200).json({
        success: true,
        message: 'Transaction history retrieved',
        payload: history,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTotalSpent(req, res, next) {
    try {
      const userId = req.user.userId;
      const totalSpent = await UserService.getTotalSpent(userId);
      res.status(200).json({
        success: true,
        message: 'Total spent retrieved',
        payload: { total_spent: totalSpent },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserByEmail(req, res, next) {
    try {
      const { email } = req.params;
      const cacheKey = `user:${email}`;

      const cachedUser = await redis.get(cacheKey);

      if (cachedUser) {
        return res.status(200).json({
          success: true,
          message: 'User retrieved from cache',
          payload: JSON.parse(cachedUser),
        });
      }
      const user = await UserService.getUserByEmail(email);
      await redis.set(cacheKey, JSON.stringify(user), 'EX', 60);
      res.status(200).json({
        success: true,
        message: 'User retrieved successfully',
        payload: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;