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

      if (typeof price !== 'number') {
        throw new ApiError(400, 'price must be a number');
      }

      if (beds === undefined) {
        throw new ApiError(400, 'beds field is required');
      }

      if (typeof beds !== 'number') {
        throw new ApiError(400, 'beds must be a number');
      }

      if (baths === undefined) {
        throw new ApiError(400, 'baths field is required');
      }

      if (typeof baths !== 'number') {
        throw new ApiError(400, 'baths must be a number');
      }

      if (parking === undefined) {
        throw new ApiError(400, 'parking field is required');
      }

      if (typeof parking !== 'number') {
        throw new ApiError(400, 'parking must be a number');
      }

      if (furnished === undefined) {
        throw new ApiError(400, 'furnished field is required');
      }

      if (typeof furnished !== 'boolean') {
        throw new ApiError(400, 'funished must be either true or false');
      }

      req.body.owner = TokenUser.id;
      next();
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static validateParam(req, res, next) {
    try {
      const number = /^[0-9]+$/;

      if (!number.test(req.params.property_id)) {
        throw new ApiError(400, 'property_id must be a number');
      }

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

      if (min_price !== undefined && !number.test(min_price)) {
        throw new ApiError(400, 'min_price must be a number');
      }

      if (max_price !== undefined && !number.test(max_price)) {
        throw new ApiError(400, 'max_price must be a number');
      }

      if (beds !== undefined && !number.test(beds)) {
        throw new ApiError(400, 'beds must be a number');
      }

      if (baths !== undefined && !number.test(baths)) {
        throw new ApiError(400, 'baths must be a number');
      }

      if (parking !== undefined && !number.test(parking)) {
        throw new ApiError(400, 'parking must be a number');
      }

      if (furnished !== undefined && furnished !== 'new' && furnished !== 'used') {
        throw new ApiError(400, "furnished must either be 'new' or 'used'");
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }
}
