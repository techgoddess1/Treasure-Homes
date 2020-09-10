import pool from '../services/index';

const userTable =
  'CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, email VARCHAR(40) not null, firstname VARCHAR(40), lastname VARCHAR(40), street VARCHAR(40), password VARCHAR(256), gender VARCHAR(7), "isAdmin" BOOLEAN, "registeredOn" TIMESTAMP, city VARCHAR(40), state VARCHAR(20), country VARCHAR(20), phone VARCHAR(40), zip VARCHAR(20))';

pool.query(userTable);
