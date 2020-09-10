/* eslint-disable class-methods-use-this */
import cloudinary from 'cloudinary';

import Response from '../helpers/ResponseModel';

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;
const fileName = new Date().toISOString();

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

export default class ImageUploader {
  static upload(req, res, next) {
    try {
      const { image_url, TokenUser } = req.body;
      if (image_url !== undefined) {
        cloudinary.v2.uploader.upload(
          image_url,
          { public_id: `TreasureHomes/${TokenUser.id}/${fileName}` },
          (error, result) => {
            if (error) {
              res.status(400).json(new Response(false, 400, error.message));
            } else {
              req.body.image_url = result.secure_url;
              next();
            }
          }
        );
      } else {
        next();
      }
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }
}
