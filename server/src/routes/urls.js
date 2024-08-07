const { StatusCodes } = require("http-status-codes");
const express = require("express");
const router = express.Router();

const {
  getAllUrls,
  findOneByShorterUrl,
  addNewUrl,
  modifyOriginalUrl,
  deleteUrl,
  allUrlsStartsWith,
  allUrlsContains,
  allUrlsNoContains,
} = require("../services/urls");
const {
  NotFoundError,
  ConflictError,
  HandleError,
} = require("../utils/errors/urls");
const { errorMessages } = require("../utils/consts");

router.get("/all", async (_, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summary = 'Gets all urls'
  try {
    const allUrls = await getAllUrls();

    if (allUrls) {
      res.status(StatusCodes.OK).send(allUrls);
    } else {
      throw new NotFoundError(errorMessages.ALL_URLS_NOT_FOUND_MESSAGE);
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    HandleError(error, res);
  }
});

router.get("/:shorterUrl", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summary = 'Redirect to the original url'
  try {
    const { shorterUrl } = req.params;
    const url = await findOneByShorterUrl(shorterUrl);

    if (url) {
      const directUrl = url.originalUrl;
      res.status(StatusCodes.MOVED_TEMPORARILY).redirect(directUrl);
    } else {
      throw new NotFoundError(errorMessages.SHORTER_URL_NOT_FOUND_MESSAGE);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    HandleError(error, res);
  }
});

router.post("/createUrl", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summary = 'Creates a new shorter url'
  try {
    const { originalUrl, shorterUrl } = req.body;
    const newUrl = await addNewUrl(originalUrl, shorterUrl);

    if (newUrl) {
      res.status(StatusCodes.CREATED).send(newUrl);
    } else {
      throw new ConflictError(errorMessages.SHORTER_URL_EXISTS_MESSAGE);
    }
  } catch (error) {
    console.error("Error creating url:", error);
    HandleError(error, res);
  }
});

router.patch("/modifyUrl", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summary = 'Updates an existing URL'
  try {
    const { shorterUrl, newOriginalUrl } = req.body;
    const newUrl = await modifyOriginalUrl(shorterUrl, newOriginalUrl);

    if (newUrl) {
      res.status(StatusCodes.OK).send(newUrl);
    } else {
      throw new NotFoundError(errorMessages.SHORTER_URL_NOT_FOUND_MESSAGE);
    }
  } catch (error) {
    console.error("Error update url:", error);
    HandleError(error, res);
  }
});

router.delete("/deleteUrl/:shorterUrl", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summary = 'Deleting an existing URL'
  try {
    const { shorterUrl } = req.params;
    const deletedUrl = await deleteUrl(shorterUrl);

    if (deletedUrl) {
      res
        .status(StatusCodes.OK)
        .send({ message: `${shorterUrl} deleted successfully` });
    } else {
      throw new NotFoundError(errorMessages.SHORTER_URL_NOT_FOUND_MESSAGE);
    }
  } catch (error) {
    console.error("Error deleting url:", error);
    HandleError(error, res);
  }
});

router.get("/startWith/:startsWith", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summury = Gets all the short urls that starts with a specific word/letter
  try {
    const { startsWith } = req.params;
    const urls = await allUrlsStartsWith(startsWith);

    if (urls) {
      res.status(StatusCodes.OK).send(urls);
    } else {
      throw new NotFoundError(errorMessages.ALL_URLS_NOT_FOUND_MESSAGE);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    HandleError(error, res);
  }
});

router.get("/contains/:contains", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summury = Gets all the short urls that contains a specific word/letter
  try {
    const { contains } = req.params;
    const urls = await allUrlsContains(contains);

    if (urls) {
      res.status(StatusCodes.OK).send(urls);
    } else {
      throw new NotFoundError(errorMessages.ALL_URLS_NOT_FOUND_MESSAGE);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    HandleError(error, res);
  }
});

router.get("/notContains/:notContains", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summury = Gets all the short urls that contains a specific word/letter
  try {
    const { notContains } = req.params;
    const urls = await allUrlsNoContains(notContains);

    if (urls) {
      res.status(StatusCodes.OK).send(urls);
    } else {
      throw new NotFoundError(errorMessages.ALL_URLS_NOT_FOUND_MESSAGE);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    HandleError(error, res);
  }
});

module.exports = router;
