const { StatusCodes } = require("http-status-codes");

const {
  ALL_URLS_NOT_FOUND_MESSAGE,
  SHORTER_URL_EXISTS_MESSAGE,
  SHORTER_URL_NOT_FOUND_MESSAGE,
} = require("../consts/index");

class CustomUrlReqError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }

  HandleError(error, res) {
    error.statusCode !== null
      ? res.status(this.statusCode).send({ message: this.message })
      : res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ error: error.message });
  }
}

exports.AllUrlsNotFoundError = new CustomUrlReqError(
  ALL_URLS_NOT_FOUND_MESSAGE,
  StatusCodes.NOT_FOUND
);

exports.ShorterUrlNotFoundError = new CustomUrlReqError(
  SHORTER_URL_NOT_FOUND_MESSAGE,
  StatusCodes.NOT_FOUND
);

exports.ShorterUrlExistsError = new CustomUrlReqError(
  SHORTER_URL_EXISTS_MESSAGE,
  StatusCodes.CONFLICT
);
