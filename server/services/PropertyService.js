import Property from '../models/PropertyModel';
import ApiError from '../helpers/ApiError';
import pool from './index';

/* eslint-disable class-methods-use-this */
export default class PropertyService {
  static async createProperty(body) {
    if (body === undefined) {
      throw new ApiError(400, "Body can't be empty");
    }
    const query =
      'INSERT INTO properties("userId", state, status, price, "imageUrl", description, street, city, country, "propertyType", "propertyKind", baths, beds, sqrft, parking, furnished, "createdOn") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *';

    const PropertyData = new Property();

    PropertyData.setPropertyWithBody(body);

    const property = await pool.query(query, PropertyData.getPropertyAsArray());

    return property[0];
  }

  static async findPropertyById(id) {
    const query = 'SELECT * FROM properties WHERE id = $1';
    const property = await pool.query(query, [id]);

    return property;
  }

  static async findByStatus(status, { location, min, max, beds, baths, parking, furnished }) {
    const statusQuery = 'SELECT * FROM properties WHERE status=$1';
    const rangeQuery = 'SELECT * FROM properties WHERE status=$1 AND price BETWEEN $2 AND $3';
    const rangeStateQuery =
      'SELECT * FROM properties WHERE status=$1 AND state=$2 AND price BETWEEN $3 AND $4';
    const stateQuery = 'SELECT * FROM properties WHERE status=$1 AND state=$2';
    const minQuery = 'SELECT * FROM properties WHERE status=$1 AND price>=$2';
    const minStateQuery = 'SELECT * FROM properties WHERE status=$1 AND price>=$2 AND state=$3';
    const maxQuery = 'SELECT * FROM properties WHERE status=$1 AND price<=$2';
    const maxStateQuery = 'SELECT * FROM properties WHERE status=$1 AND price<=$2 AND state=$3';
    const bedsQuery = 'SELECT * FROM properties WHERE status=$1 AND beds=$2';
    const bathsQuery = 'SELECT * FROM properties WHERE status=$1 AND baths=$2';
    const parkingQuery = 'SELECT * FROM properties WHERE status=$1 AND parking=$2';
    const furninshedQuery = 'SELECT * FROM properties WHERE status=$1 AND furnished=$2';
    const allQuery =
      'SELECT * FROM properties WHERE status=$1 AND state=$2 AND price BETWEEN $3 AND $4 AND beds=$5 AND baths=$6 AND parking=$7 AND furnished=$8';
    let PropertiesByStatus;
    if (!min && !max && !location && !beds && !baths && !parking && !furnished) {
      PropertiesByStatus = await pool.query(statusQuery, [status]);
    } else if (!min && !max && location && !beds && !baths && !parking && !furnished) {
      PropertiesByStatus = await pool.query(stateQuery, [status, location]);
    } else if (min && max && !location && !beds && !baths && !parking && !furnished) {
      PropertiesByStatus = await pool.query(rangeQuery, [status, min, max]);
    } else if (min && !max && !location && !beds && !baths && !parking && !furnished) {
      PropertiesByStatus = await pool.query(minQuery, [status, min]);
    } else if (!min && max && !location && !beds && !baths && !parking && !furnished) {
      PropertiesByStatus = await pool.query(maxQuery, [status, max]);
    } else if (min && max && location && !beds && !baths && !parking && !furnished) {
      PropertiesByStatus = await pool.query(rangeStateQuery, [status, location, min, max]);
    } else if (min && !max && location && !beds && !baths && !parking && !furnished) {
      PropertiesByStatus = await pool.query(minStateQuery, [status, min, location]);
    } else if (!min && max && location && !beds && !baths && !parking && !furnished) {
      PropertiesByStatus = await pool.query(maxStateQuery, [status, max, location]);
    } else if (!min && !max && !location && beds && !baths && !parking && !furnished) {
      PropertiesByStatus = await pool.query(bedsQuery, [status, beds]);
    } else if (!min && !max && !location && !beds && baths && !parking && !furnished) {
      PropertiesByStatus = await pool.query(bathsQuery, [status, baths]);
    } else if (!min && !max && !location && !beds && !baths && parking && !furnished) {
      PropertiesByStatus = await pool.query(parkingQuery, [status, parking]);
    } else if (!min && !max && !location && !beds && !baths && !parking && furnished) {
      PropertiesByStatus = await pool.query(furninshedQuery, [status, furnished]);
    } else if (min && max && location && beds && baths && parking && furnished) {
      PropertiesByStatus = await pool.query(allQuery, [
        status,
        location,
        min,
        max,
        beds,
        baths,
        parking,
        furnished,
      ]);
    }

    return PropertiesByStatus;
  }

  static async deleteProperty(propertyId) {
    if (propertyId === undefined) {
      throw new ApiError(400, 'Please provide propertyId');
    }

    const query = 'DELETE FROM properties WHERE id=$1';
    pool.query(query, [propertyId]);
  }

  static async findAll() {
    const query = 'SELECT * FROM properties';
    const properties = await pool.query(query);

    return properties;
  }
}
