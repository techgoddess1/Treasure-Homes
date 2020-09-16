import { hashSync, genSaltSync } from 'bcrypt';

export default class User {
  constructor(
    id,
    email,
    firstName,
    lastName,
    gender,
    password,
    street,
    isAdmin,
    city,
    state,
    country,
    phone,
    zip
  ) {
    this.id = id;
    this.email = email;
    this.firstname = firstName;
    this.lastname = lastName;
    this.gender = gender;
    this.password = password;
    this.isAdmin = isAdmin;
    this.street = street;
    this.city = city;
    this.state = state;
    this.country = country;
    this.phone = phone;
    this.zip = zip;
    this.registeredOn = new Date();
  }

  setUserWithBody(body) {
    this.email = body.email;
    this.firstname = body.first_name;
    this.lastname = body.last_name;
    this.gender = body.gender;
    this.password = hashSync(body.password, genSaltSync(10));
    this.street = body.street;
    this.isAdmin = body.is_admin || false;
    this.city = body.city;
    this.state = body.state;
    this.country = body.country;
    this.phone = body.phone;
    this.zip = body.zip;
  }

  getUserAsArray() {
    return [
      this.email,
      this.firstname,
      this.lastname,
      this.street,
      this.password,
      this.gender,
      this.isAdmin,
      this.registeredOn,
      this.city,
      this.state,
      this.country,
      this.phone,
      this.zip,
    ];
  }
}
