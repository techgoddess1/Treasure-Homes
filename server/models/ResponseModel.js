export default class Response {
  constructor(success, status, data) {
    this.status = status;
    if (success) {
      this.data = data;
    } else {
      this.error = data;
    }
  }
}
