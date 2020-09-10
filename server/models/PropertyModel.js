export default class Property {
  constructor(
    id,
    owner,
    state,
    price,
    imageUrl,
    description,
    street,
    city,
    country,
    propertyType,
    propertyKind,
    status,
    beds,
    baths,
    sqrft,
    parking,
    furnished
  ) {
    this.id = id;
    this.owner = owner;
    this.state = state;
    this.status = 'available';
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this.street = street;
    this.city = city;
    this.country = country;
    this.propertyType = propertyType;
    this.propertyKind = propertyKind;
    this.status = status;
    this.baths = baths;
    this.beds = beds;
    this.sqrft = sqrft;
    this.parking = parking;
    this.furnished = furnished;
    this.createdOn = new Date();
  }

  setPropertyWithBody(body) {
    this.owner = body.owner;
    this.state = body.state;
    this.status = body.status || 'available';
    this.price = body.price;
    this.imageUrl = body.image_url;
    this.description = body.description;
    this.street = body.street;
    this.city = body.city;
    this.country = body.country;
    this.propertyType = body.propertyType;
    this.propertyKind = body.propertyKind;
    this.status = body.status;
    this.baths = body.baths;
    this.beds = body.beds;
    this.sqrft = body.sqrft;
    this.parking = body.parking;
    this.furnished = body.furnished;
  }

  getPropertyAsArray() {
    return [
      this.owner,
      this.state,
      this.status,
      this.price,
      this.imageUrl,
      this.description,
      this.street,
      this.city,
      this.country,
      this.propertyType,
      this.propertyKind,
      this.baths,
      this.beds,
      this.sqrft,
      this.parking,
      this.furnished,
      this.createdOn,
    ];
  }
}
