export default class UserResponse {
  constructor(User, token) {
    this.token = token;
    this.id = User.id;
    this.email = User.email;
    this.first_name = User.firstName;
    this.last_name = User.lastName;
    this.gender = User.gender;
    this.is_admin = User.isAdmin;
    this.street = User.street;
    this.city = User.city;
    this.state = User.state;
    this.country = User.country;
    this.phone = User.phone;
    this.zip = User.zip;
    this.registered_on = User.registeredOn;
  }
}
