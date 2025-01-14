class CustomException extends Error {
  constructor(id, message) {
    super(message);
    this.id = id;
  }
}