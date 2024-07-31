const { Op } = require("sequelize");
const Url = require("../utils/models/url");

const getAllUrls = async () => {
  const allUrls = await Url.findAll();
  return allUrls;
};

const findOneByShorterUrl = async (shortUrl) => {
  const url = await Url.findOne({ where: { shorterUrl: shortUrl } });
  return url;
};

const addNewUrl = async (originalUrl, shorterUrl) => {
  const url = await findOneByShorterUrl(shorterUrl);

  if (!url) {
    const newUrl = await createUrl(originalUrl, shorterUrl);
    return newUrl;
  }

  return;
};

const modifyUrl = async (shorterUrl, newShorterUrl) => {
  const originalShorterUrl = await findOneByShorterUrl(shorterUrl); // change this name
  if (!originalShorterUrl) {
    return "noUrl";
  }

  const findNewShorterUrl = await findOneByShorterUrl(newShorterUrl);
  if (findNewShorterUrl) {
    return "newUrlExist";
  }

  const modifiedUrl = await originalShorterUrl.update({
    shorterUrl: newShorterUrl,
  });

  return modifiedUrl;
};

const deleteUrl = async (shorterUrl) => {
  const url = await findOneByShorterUrl(shorterUrl);

  if (url) {
    await url.destroy();
    return;
  }

  return "not found"; //null
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

const createUrl = async (originalUrl, shorterUrl) => {
  const newUrl = await Url.create({
    originalUrl: originalUrl,
    shorterUrl: shorterUrl,
  });

  return newUrl;
};

module.exports = {
  getAllUrls,
  findOneByShorterUrl,
  addNewUrl,
  modifyUrl,
  deleteUrl,
  urlsStartsWith,
  urlsContains,
  urlsNoContains,
};
