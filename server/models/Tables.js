import pool from '../services/index';

const userTable =
  'CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, email VARCHAR(40) not null, firstname VARCHAR(40), lastname VARCHAR(40), street VARCHAR(40), password VARCHAR(256), gender VARCHAR(7), "isAdmin" BOOLEAN, "registeredOn" TIMESTAMP, city VARCHAR(40), state VARCHAR(20), country VARCHAR(20), phone VARCHAR(40), zip VARCHAR(20))';

const propertyTable =
  'CREATE TABLE IF NOT EXISTS properties(id SERIAL PRIMARY KEY, street VARCHAR(40), city VARCHAR(40), state VARCHAR(20), country VARCHAR(20), "propertyType" VARCHAR(5), "propertyKind" VARCHAR(50), status VARCHAR(12), description VARCHAR(256), price DECIMAL(10, 2), "imageUrl" VARCHAR(256), "createdOn" TIMESTAMP, beds SMALLINT, baths SMALLINT, sqrft SMALLINT, parking SMALLINT, furnished BOOLEAN, "userId" INT, FOREIGN KEY ("userId") REFERENCES users(id))';

pool.query(userTable);
pool.query(propertyTable);
