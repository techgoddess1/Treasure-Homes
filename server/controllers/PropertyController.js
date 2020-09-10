/* eslint-disable class-methods-use-this */
import PropertyResponse from '../models/PropertyResponse';
import PropertyService from '../services/PropertyService';
import Response from '../helpers/ResponseModel';
import UserService from '../services/UserService';
import ApiError from '../helpers/ApiError';

export default class PropertyController {
  static async create(req, res) {
    try {
      const { body } = req;
      const { TokenUser } = body;

      const property = await PropertyService.createProperty(body);

      res.status(201).json(new Response(true, 201, new PropertyResponse(property, TokenUser)));
    } catch (error) {
      console.log(error);
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static async getProperty(req, res) {
    try {
      const { property_id } = req.params;

      const Property = await PropertyService.findPropertyById(property_id);

      if (Property.length < 1) {
        throw new ApiError(404, `Property with id: ${property_id} does not exist`);
      }

      const User = await UserService.findUserById(Property[0].userId);

      if (User.length < 1) {
        throw new ApiError(404, `User with id: ${Property[0].userId} does not exist`);
      }

      res.status(200).json(new Response(true, 200, new PropertyResponse(Property[0], User[0])));
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static async getPropertiesByStatus(req, res) {
    try {
      const { min_price, max_price, beds, baths, parking, furnished, location } = req.query;
      let availableProperties = [];

      if (
        min_price === undefined &&
        max_price === undefined &&
        beds === undefined &&
        baths === undefined &&
        parking === undefined &&
        furnished === undefined &&
        location === undefined
      ) {
        availableProperties = await PropertyService.findByStatus('available', {});
      } else if (
        min_price === undefined &&
        max_price === undefined &&
        beds === undefined &&
        baths === undefined &&
        parking === undefined &&
        furnished === undefined &&
        location !== undefined
      ) {
        availableProperties = await PropertyService.findByStatus('available', {
          location,
        });
      } else if (
        min_price !== undefined &&
        max_price !== undefined &&
        beds === undefined &&
        baths === undefined &&
        parking === undefined &&
        furnished === undefined &&
        location === undefined
      ) {
        availableProperties = await PropertyService.findByStatus('available', {
          min: min_price,
          max: max_price,
        });
      } else if (
        min_price !== undefined &&
        max_price === undefined &&
        beds === undefined &&
        baths === undefined &&
        parking === undefined &&
        furnished === undefined &&
        location === undefined
      ) {
        availableProperties = await PropertyService.findByStatus('available', { min: min_price });
      } else if (
        min_price === undefined &&
        max_price !== undefined &&
        beds === undefined &&
        baths === undefined &&
        parking === undefined &&
        furnished === undefined &&
        location === undefined
      ) {
        availableProperties = await PropertyService.findByStatus('available', { max: max_price });
      } else if (
        min_price !== undefined &&
        max_price !== undefined &&
        beds === undefined &&
        baths === undefined &&
        parking === undefined &&
        furnished === undefined &&
        location !== undefined
      ) {
        availableProperties = await PropertyService.findByStatus('available', {
          min: min_price,
          max: max_price,
          location,
        });
      } else if (
        min_price !== undefined &&
        max_price === undefined &&
        beds === undefined &&
        baths === undefined &&
        parking === undefined &&
        furnished === undefined &&
        location !== undefined
      ) {
        availableProperties = await PropertyService.findByStatus('available', {
          min: min_price,
          location,
        });
      } else if (
        min_price === undefined &&
        max_price !== undefined &&
        beds === undefined &&
        baths === undefined &&
        parking === undefined &&
        furnished === undefined &&
        location !== undefined
      ) {
        availableProperties = await PropertyService.findByStatus('available', {
          max: max_price,
          location,
        });
      } else if (
        min_price === undefined &&
        max_price === undefined &&
        beds !== undefined &&
        baths === undefined &&
        parking === undefined &&
        furnished === undefined &&
        location === undefined
      ) {
        availableProperties = await PropertyService.findByStatus('available', { beds });
      } else if (
        min_price === undefined &&
        max_price === undefined &&
        beds === undefined &&
        baths !== undefined &&
        parking === undefined &&
        furnished === undefined &&
        location === undefined
      ) {
        availableProperties = await PropertyService.findByStatus('available', {
          baths,
        });
      } else if (
        min_price === undefined &&
        max_price === undefined &&
        beds === undefined &&
        baths === undefined &&
        parking === undefined &&
        furnished !== undefined &&
        location === undefined
      ) {
        availableProperties = await PropertyService.findByStatus('available', { parking });
      } else if (
        min_price === undefined &&
        max_price === undefined &&
        beds === undefined &&
        baths === undefined &&
        parking === undefined &&
        furnished === undefined &&
        location !== undefined
      ) {
        availableProperties = await PropertyService.findByStatus('available', { furnished });
      } else if (
        min_price !== undefined &&
        max_price !== undefined &&
        beds !== undefined &&
        baths !== undefined &&
        parking !== undefined &&
        furnished !== undefined &&
        location !== undefined
      ) {
        availableProperties = await PropertyService.findByStatus('available', {
          max: max_price,
          min: min_price,
          beds,
          baths,
          parking,
          location,
          furnished,
        });
      }

      if (availableProperties.length < 1) {
        throw new ApiError(200, 'No property matches your search parameter[s]');
      }

      res
        .status(200)
        .json(
          new Response(
            true,
            200,
            await PropertyResponse.setResponseFromPropertyArray(availableProperties)
          )
        );
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static async delete(req, res) {
    try {
      const { property_id } = req.params;
      const property = await PropertyService.findPropertyById(property_id);

      if (property.length < 1) {
        throw new ApiError(404, `Property with id: ${property_id} does not exist`);
      }

      PropertyService.deleteProperty(property_id);

      res.status(200).json(new Response(true, 200, 'The property has been deleted successfully'));
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static async getAll(req, res, next) {
    try {
      if (req.body.TokenUser.isAdmin === true) {
        const propertiesArray = await PropertyService.findAll();

        if (propertiesArray.length < 1) {
          res
            .status(404)
            .json(new Response(true, 404, 'There are no sold or available properties'));
        } else {
          res
            .status(200)
            .json(
              new Response(
                true,
                200,
                await PropertyResponse.setResponseFromPropertyArray(propertiesArray)
              )
            );
        }
      } else {
        next();
      }
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }
}
