/* eslint-disable class-methods-use-this */
import ApiError from '../helpers/ApiError';
import Response from '../helpers/ResponseModel';
import UserService from '../services/UserService';

export default class UserMiddleware {
  static validateSignup(req, res, next) {
    try {
      const { email, first_name, last_name, gender, password, street, is_admin } = req.body;

      if (email === undefined) {
        throw new ApiError(400, 'email field is required');
      }

      if (typeof email !== 'string') {
        throw new ApiError(400, 'email must be a string');
      }

      if (first_name === undefined) {
        throw new ApiError(400, 'first_name field is required');
      }

      if (typeof first_name !== 'string') {
        throw new ApiError(400, 'first_name must be a string');
      }

      if (last_name === undefined) {
        throw new ApiError(400, 'last_name field is required');
      }

      if (typeof last_name !== 'string') {
        throw new ApiError(400, 'last_name must be a string');
      }

      if (gender !== undefined && typeof gender !== 'string') {
        throw new ApiError(400, 'gender must be a string');
      }

      if (gender !== undefined && gender !== 'male' && gender !== 'female') {
        throw new ApiError(400, 'gender value can either be male or female');
      }

      if (password === undefined) {
        throw new ApiError(400, 'password field is required');
      }

      if (typeof password !== 'string') {
        throw new ApiError(400, 'password must be a string');
      }

      if (street === undefined) {
        throw new ApiError(400, 'street field is required');
      }

      if (typeof street !== 'string') {
        throw new ApiError(400, 'street must be a string');
      }

      if (is_admin !== undefined && typeof is_admin !== 'boolean') {
        throw new ApiError(400, 'is_admin must be a boolean');
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static validateEmail(req, res, next) {
    try {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(req.body.email)) {
        throw new ApiError(400, `The email: ${req.body.email} is not valid`);
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static validatePassword(req, res, next) {
    try {
      const re = /^([a-zA-Z0-9@*#]{8,15})$/;
      if (!re.test(req.body.password)) {
        throw new ApiError(
          400,
          'The password is not valid. password may include alphanumeric characters and must consists of at least 8 characters and not more than 15 characters'
        );
      }

      if (req.body.new_password !== undefined) {
        if (!re.test(req.body.new_password)) {
          throw new ApiError(
            400,
            'The password is not valid. new_password may include alphanumeric characters and must consists of at least 8 characters and not more than 15 characters'
          );
        }
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static async validateUser(req, res, next) {
    try {
      const user = await UserService.findUserByEmail(req.body.email);
      if (user.length > 0) {
        throw new ApiError(409, `User with email: ${req.body.email} already exist`);
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static validateLogin(req, res, next) {
    try {
      const { email, password } = req.body;

      if (email === undefined) {
        throw new ApiError(400, 'email field is required');
      }

      if (typeof email !== 'string') {
        throw new ApiError(400, 'email must be a string');
      }

      if (password === undefined) {
        throw new ApiError(400, 'password field is required');
      }

      if (typeof password !== 'string') {
        throw new ApiError(400, 'password must be a string');
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }
}
