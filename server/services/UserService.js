import { hashSync, genSaltSync } from 'bcrypt';

import User from '../models/UserModel';
import ApiError from '../helpers/ApiError';
import pool from './index';

/* eslint-disable class-methods-use-this */
export default class UserService {
  static async createUser(body) {
    const query =
      'INSERT INTO users(email, "firstname", "lastname", street, password, gender, "isAdmin", "registeredOn", city, state, country, phone, zip) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *';

    const UserData = new User();

    UserData.setUserWithBody(body);

    const user = await pool.query(query, UserData.getUserAsArray());

    return user;
  }

  static async findUserByEmail(email) {
    if (email === undefined) {
      throw new ApiError(400, 'Please provide a valid email');
    }
    const query = 'SELECT * FROM users WHERE email = $1';
    const user = await pool.query(query, [email]);

    return user;
  }

  static async findUserById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const user = await pool.query(query, [id]);

    return user;
  }
}
