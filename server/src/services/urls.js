const Url = require("../utils/models/url");

const getUrls = async () => {
  const urls = await Url.findAll();
  return urls;
};
const findOneByShortenerUrl = async (shortUrl) => {
  const url = await Url.findOne({ shortenerUrl: shortUrl });
  return url;
};

const createUrl = async (originalUrl, shortenerUrl) => {
  const url = await findOneByShortenerUrl(shortenerUrl);
  if (!url) {
    const newUrl = await Url.create({ originalUrl, shortenerUrl });
    return newUrl;
  }
  return;
};

const modifyUrl = async (shortenerUrl, newShortenerUrl) => {
  const urlOriginalShortenerUrl = await findOneByShortenerUrl(shortenerUrl);
  if (!urlOriginalShortenerUrl) {
    return "noOriginalUrl";
  }
  const urlNewShortenerUrl = await findOneByShortenerUrl(newShortenerUrl);
  if (!urlNewShortenerUrl) {
    return "noNewUrl";
  }
  const newUrl = await Url.update({ shortenerUrl: newShortenerUrl });
  return newUrl;
};

const deleteUrl = async (shortenerUrl) => {
  const url = await findOneByShortenerUrl(shortenerUrl);
  if (url) {
    const deletedUrl = await url.destroy();
    return deletedUrl;
  }
  return;
};
module.exports = {
  getUrls,
  findOneByShortenerUrl,
  createUrl,
  modifyUrl,
  deleteUrl,
};
