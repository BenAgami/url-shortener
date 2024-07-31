const { Op } = require("sequelize");
const Url = require("../utils/models/url");

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

  return;
};

const modifyUrl = async (originalUrl, shorterUrl) => {
  const url = await findOneByShorterUrl(shorterUrl);

  if (!url) {
    return;
  }

  const modifiedUrl = await url.update({
    originalUrl: originalUrl,
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
