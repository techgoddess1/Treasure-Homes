export default class Property {
  constructor(
    id,
    title,
    owner,
    price,
    imageUrl,
    description,
    address,
    propertyType,
    status,
    beds,
    baths,
    sqrft,
    parking,
    furnished
  ) {
    this.id = id;
    this.owner = owner;
    this.title = title;
    this.status = 'available';
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this.address = address;
    this.propertyType = propertyType;
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
    this.title = body.title;
    this.status = body.status || 'available';
    this.price = body.price;
    this.imageUrl = body.image_url;
    this.description = body.description;
    this.address = body.address;
    this.propertyType = body.propertyType;
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
      this.title,
      this.status,
      this.price,
      this.imageUrl,
      this.description,
      this.address,
      this.propertyType,
      this.baths,
      this.beds,
      this.sqrft,
      this.parking,
      this.furnished,
      this.createdOn,
    ];
  }
}
