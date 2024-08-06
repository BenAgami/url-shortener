// message constants
const URLS_ENTITIES_NOT_FOUND_MESSAGE = "Urls not found";
const URL_ENTITY_NOT_FOUND_MESSAGE = "Url not found";
const SHORTER_URL_ENTITY_EXISTS_MESSAGE = "Shorter url already exist";
const SHORTER_URL_NOT_FOUND_MESSAGE = "Shorter url not found";
const URL_NOT_FOUND_MESSAGE = "Url not found";

// url constants
const REAL_URL = {
  originalUrl: "http://google.com/",
  shorterUrl: "google",
};

const MOCKED_URL = {
  originalUrl: "https://www.mocked.com/",
  shorterUrl: "mocked",
};

const MODIFIED_URL = {
  newOriginalUrl: "https://www.youtube.com/",
  shorterUrl: "google",
};

module.exports = {
  URLS_ENTITIES_NOT_FOUND_MESSAGE,
  URL_ENTITY_NOT_FOUND_MESSAGE,
  SHORTER_URL_ENTITY_EXISTS_MESSAGE,
  SHORTER_URL_NOT_FOUND_MESSAGE,
  URL_NOT_FOUND_MESSAGE,
  REAL_URL,
  MOCKED_URL,
  MODIFIED_URL,
};
