const { Op } = require("sequelize");

const getUrlModel = require("../utils/models/url");

const tableName = process.env.TABLE_NAME;
const UrlModel = getUrlModel(tableName);

const getAllUrls = async () => {
  const allUrls = await UrlModel.findAll();

  if (allUrls.length === 0) {
    return null;
  }

  return allUrls;
};

const findOneByShorterUrl = async (shorterUrl) => {
  const url = await UrlModel.findOne({ where: { shorterUrl: shorterUrl } });

  if (!url) {
    return null;
  }

  return url;
};

const addNewUrl = async (originalUrl, shorterUrl) => {
  const url = await findOneByShorterUrl(shorterUrl);

  if (url) {
    return null;
  }

  const newUrl = getNewUrl(originalUrl, shorterUrl);
  const addedNewUrl = await UrlModel.create(newUrl);

  return addedNewUrl;
};

const modifyOriginalUrl = async (shorterUrl, newOriginalUrl) => {
  const url = await findOneByShorterUrl(shorterUrl);

  if (!url) {
    return null;
  }

  const modifiedUrl = await url.update({
    originalUrl: newOriginalUrl,
  });

  return modifiedUrl;
};

const deleteUrl = async (shorterUrl) => {
  const url = await findOneByShorterUrl(shorterUrl);

  if (!url) {
    return null;
  }

  return await url.destroy();
};

const allUrlsStartsWith = async (letters) => {
  const urlsStartsWith = await UrlModel.findAll({
    where: { shorterUrl: { [Op.startsWith]: letters } },
  });

  if (urlsStartsWith.length === 0) {
    return null;
  }

  return urlsStartsWith;
};

const allUrlsContains = async (letters) => {
  const urlsContains = await UrlModel.findAll({
    where: { shorterUrl: { [Op.substring]: letters } },
  });

  if (urlsContains.length === 0) {
    return null;
  }

  return urlsContains;
};

const allUrlsNoContains = async (letters) => {
  const urlsNoContains = await UrlModel.findAll({
    where: { shorterUrl: { [Op.notLike]: `%${letters}%` } },
  });

  if (urlsNoContains.length === 0) {
    return null;
  }

  return urlsNoContains;
};

const getNewUrl = (originalUrl, shorterUrl) => {
  const newUrl = { originalUrl: originalUrl, shorterUrl: shorterUrl };
  return newUrl;
};

const deleteAllUrls = async () => {
  await UrlModel.destroy({
    where: {},
    truncate: true,
  });
};

module.exports = {
  getAllUrls,
  findOneByShorterUrl,
  addNewUrl,
  modifyOriginalUrl,
  deleteUrl,
  allUrlsStartsWith,
  allUrlsContains,
  allUrlsNoContains,
  deleteAllUrls,
};
