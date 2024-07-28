const { where, Op } = require("sequelize");
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

const urlsStartsWith = async (letters) => {
  const urlsStartWith = await Url.findAll({
    where: { [Op.startsWith]: letters },
  });
  return urlsStartWith;
};

const urlsContains = async (letters) => {
  const urlsContains = await Url.findAll({ where: { [Op.contains]: letters } });
  return urlsContains;
};

const urlsNoContains = async (letters) => {
  const urlsStartWith = await Url.findAll({ where: { [Op.notLike]: letters } });
  return urlsStartWith;
};

module.exports = {
  getUrls,
  findOneByShortenerUrl,
  createUrl,
  modifyUrl,
  deleteUrl,
  urlsStartsWith,
  urlsContains,
  urlsNoContains,
};
