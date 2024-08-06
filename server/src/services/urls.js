const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");

const getUrlModel = require("../utils/models/url");

const UrlModel = getUrlModel();

const getAllUrls = async () => {
  const allUrls = await UrlModel.findAll();
  return allUrls;
};

const findOneByShorterUrl = async (shorterUrl) => {
  const url = await UrlModel.findOne({ where: { shorterUrl: shorterUrl } });
  return url;
};

const addNewUrl = async (originalUrl, shorterUrl) => {
  const url = await findOneByShorterUrl(shorterUrl);

  if (!url) {
    const newUrl = getNewUrl(originalUrl, shorterUrl);
    const addedNewUrl = await UrlModel.create(newUrl);
    return addedNewUrl;
  }

  return StatusCodes.CONFLICT;
};

const modifyOriginalUrl = async (shorterUrl, newOriginalUrl) => {
  const url = await findOneByShorterUrl(shorterUrl);

  if (url) {
    const modifiedUrl = await url.update({
      originalUrl: newOriginalUrl,
    });

    return modifiedUrl;
  }

  return StatusCodes.NOT_FOUND;
};

const deleteUrl = async (shorterUrl) => {
  const url = await findOneByShorterUrl(shorterUrl);

  if (url) {
    return await url.destroy();
  }

  return StatusCodes.NOT_FOUND;
};

const allUrlsStartsWith = async (letters) => {
  const urlsStartsWith = await UrlModel.findAll({
    where: { shorterUrl: { [Op.startsWith]: letters } },
  });

  return urlsStartsWith;
};

const allUrlsContains = async (letters) => {
  const urlsContains = await UrlModel.findAll({
    where: { shorterUrl: { [Op.substring]: letters } },
  });

  return urlsContains;
};

const allUrlsNoContains = async (letters) => {
  const urlsNoContains = await UrlModel.findAll({
    where: { shorterUrl: { [Op.notLike]: `%${letters}%` } },
  });

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
