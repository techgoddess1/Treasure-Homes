/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';

import Response from '../helpers/ResponseModel';
import UserService from '../services/UserService';
import ApiError from '../helpers/ApiError';

const { SECRET_KEY } = process.env;

export default class TokenUtility {
  static generateToken(email, password) {
    return jwt.sign({ userId: email, pass: password }, SECRET_KEY, { expiresIn: '24h' });
  }

  static checkToken(req, res, next) {
    try {
      let token = req.headers.token || req.headers.authorization;
      if (token) {
        if (token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }

        jwt.verify(token, SECRET_KEY, async (err, decoded) => {
          try {
            if (err) {
              throw new ApiError(401, `Token Error: ${err.message}`);
            }

            const TokenUser = await UserService.findUserByEmail(decoded.userId);
            if (TokenUser.length < 1) {
              throw new ApiError(404, "Token doesn't match any user");
            }

            if (TokenUser[0].password !== decoded.pass) {
              throw new ApiError(401, 'Token no longer valid');
            }

            req.body.TokenUser = TokenUser[0];
            next();
          } catch (error) {
            res
              .status(error.status || 500)
              .json(new Response(false, error.status || 500, error.message));
          }
        });
      } else {
        throw new ApiError(401, 'Authorization token is empty. Please provide a valid token');
      }
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }
}
