/* eslint-disable class-methods-use-this */
import { compareSync } from 'bcrypt';

import Response from '../helpers/ResponseModel';
import UserResponse from '../models/UserResponse';
import TokenGenerator from '../middlewares/TokenMiddleware';
import UserService from '../services/UserService';
import ApiError from '../helpers/ApiError';

export default class UserController {
  static async create(req, res) {
    try {
      const { body } = req;
      const user = await UserService.createUser(body);

      const token = TokenGenerator.generateToken(user[0].email, user[0].password);

      res.status(201).json(new Response(true, 201, new UserResponse(user[0], token)));
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static async signin(req, res) {
    try {
      const { body } = req;
      const user = await UserService.findUserByEmail(body.email);

      if (user.length < 1) {
        throw new ApiError(404, 'The email is not associated with any user');
      }

      if (compareSync(body.password, user[0].password)) {
        const token = TokenGenerator.generateToken(user[0].email, user[0].password);

        res.status(200).json(new Response(true, 200, new UserResponse(user[0], token)));
      } else {
        res.status(401).json(new Response(false, 401, 'The password is incorrect'));
      }
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }
}
