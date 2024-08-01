const { Op } = require("sequelize");
const Url = require("../utils/models/url");
const { StatusCodes } = require("http-status-codes");

const getAllUrls = async () => {
  const allUrls = await Url.findAll();
  return allUrls;
};

const findOneByShorterUrl = async (shorterUrl) => {
  const url = await Url.findOne({ where: { shorterUrl: shorterUrl } });
  return url;
};

const addNewUrl = async (originalUrl, shorterUrl) => {
  const url = await findOneByShorterUrl(shorterUrl);

  if (!url) {
    const newUrl = await createUrl(originalUrl, shorterUrl);
    return newUrl;
  }

  return StatusCodes.CONFLICT;
};

const modifyOriginalUrl = async (originalUrl, shorterUrl) => {
  const url = await findOneByShorterUrl(shorterUrl);

  if (!url) {
    return StatusCodes.CONFLICT;
  }

  const modifiedUrl = await url.update({
    originalUrl: originalUrl,
  });

  return modifiedUrl;
};

const deleteUrl = async (shorterUrl) => {
  const url = await findOneByShorterUrl(shorterUrl);

  if (url) {
    return await url.destroy();
  }

  return StatusCodes.NOT_FOUND;
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
  modifyOriginalUrl,
  deleteUrl,
  urlsStartsWith,
  urlsContains,
  urlsNoContains,
};
