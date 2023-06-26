class NoAccessError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.name = 'NoAccessError';
  }
}

module.exports = NoAccessError;
