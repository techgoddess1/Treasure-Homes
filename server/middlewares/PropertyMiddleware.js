import ApiError from '../helpers/ApiError';
import UserService from '../services/UserService';
import PropertyService from '../services/PropertyService';
import Response from '../helpers/ResponseModel';

export default class PropertyMiddleware {
  static validateCreate(req, res, next) {
    try {
      const { status, price, beds, baths, parking, furnished, TokenUser } = req.body;

      if (status === undefined) {
        throw new ApiError(400, 'status field is required');
      }

      if (typeof status !== 'string') {
        throw new ApiError(400, 'status must be a string');
      }

      if (status !== 'available') {
        throw new ApiError(400, 'status must be available');
      }

      if (price === undefined) {
        throw new ApiError(400, 'price field is required');
      }

      if (beds === undefined) {
        throw new ApiError(400, 'beds field is required');
      }

      if (baths === undefined) {
        throw new ApiError(400, 'baths field is required');
      }

      if (parking === undefined) {
        throw new ApiError(400, 'parking field is required');
      }

      req.body.owner = TokenUser.id;
      next();
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static validateAdmin(req, res, next) {
    try {
      const { TokenUser } = req.body;

      if (TokenUser.isAdmin !== true) {
        throw new ApiError(401, 'Logged in user is not an Admin');
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static validateStatus(req, res, next) {
    try {
      const { status, min_price, max_price, beds, baths, parking, furnished } = req.query;
      const number = /^[0-9]+$/;

      if (status === undefined) {
        throw new ApiError(400, 'Query param status is required');
      }

      if (status !== 'available') {
        throw new ApiError(400, "status must be 'available'");
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }
}
