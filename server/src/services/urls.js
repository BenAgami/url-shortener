const { Op } = require("sequelize");
const Url = require("../utils/models/url");

const getUrls = async () => {
  const urls = await Url.findAll();
  return urls;
};
const findOneByShortenerUrl = async (shortUrl) => {
  const url = await Url.findOne({ where: { shortenerUrl: shortUrl } });
  return url;
};

const createUrl = async (originalUrl, shortenerUrl) => {
  const url = await findOneByShortenerUrl(shortenerUrl);

  if (!url) {
    const newUrl = await Url.create({
      originalUrl: originalUrl,
      shortenerUrl: shortenerUrl,
    });
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

  const modifiedUrl = await Url.update({ shortenerUrl: newShortenerUrl });
  return modifiedUrl;
};

const deleteUrl = async (shortenerUrl) => {
  const url = await findOneByShortenerUrl(shortenerUrl);

  if (url) {
    await url.destroy();
    return;
  }

  return "not found";
};

const urlsStartsWith = async (letters) => {
  const urlsStartWith = await Url.findAll({
    where: { shortenerUrl: { [Op.startsWith]: letters } },
  });
  return urlsStartWith;
};

const urlsContains = async (letters) => {
  const urlsContains = await Url.findAll({
    where: { shortenerUrl: { [Op.contains]: letters } },
  });
  return urlsContains;
};

const urlsNoContains = async (letters) => {
  const urlsStartWith = await Url.findAll({
    where: { shortenerUrl: { [Op.notLike]: letters } },
  });
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
