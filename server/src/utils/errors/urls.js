const { StatusCodes } = require("http-status-codes");

class UrlReqError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class NotFoundError extends UrlReqError {
  constructor(message = "Not found") {
    super(message, StatusCodes.NOT_FOUND);
  }
}

class ConflictError extends UrlReqError {
  constructor(message = "Already exist") {
    super(message, StatusCodes.CONFLICT);
  }
}

const HandleError = (error, res) => {
  error.statusCode !== null
    ? res.status(error.statusCode).send({ message: error.message })
    : res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: error.message });
};

module.exports = { NotFoundError, ConflictError, HandleError };
