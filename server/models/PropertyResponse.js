import UserService from '../services/UserService';

export default class PropertyResponse {
  constructor(Property, User) {
    this.id = Property.id;
    this.owner = User.email;
    this.title = Property.title;
    this.price = Property.price;
    this.status = Property.status;
    this.image_url = Property.imageUrl;
    this.address = Property.address;
    this.description = Property.description;
    this.propertyType = Property.propertyType;
    this.beds = Property.beds;
    this.baths = Property.baths;
    this.sqrft = Property.sqrft;
    this.parking = Property.parking;
    this.furnished = Property.furnished;
    this.created_on = Property.createdOn;
  }

  // eslint-disable-next-line class-methods-use-this
  static async setResponseFromPropertyArray(properties) {
    const response = [];

    for (let i = 0; i < properties.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const User = await UserService.findUserById(properties[i].userId);
      response.push(new PropertyResponse(properties[i], User[0]));
    }
    return response;
  }
}
