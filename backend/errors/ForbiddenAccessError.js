class ForbiddenAccessError extends Error {
  constructor(message) {
    super(message || 'Нет доступа.');
    this.statusCode = 403;
  }
}

module.exports = {
  ForbiddenAccessError,
};
