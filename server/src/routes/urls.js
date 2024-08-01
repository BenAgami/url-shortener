const express = require("express");
const router = express.Router();
const {
  getAllUrls,
  findOneByShorterUrl,
  addNewUrl,
  modifyOriginalUrl,
  deleteUrl,
  urlsStartsWith,
  urlsContains,
  urlsNoContains,
} = require("../services/urls");
const { StatusCodes } = require("http-status-codes");

router.get("/all", async (_, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summary = 'Gets all urls'
  try {
    const urls = await getAllUrls();

    if (!urls) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: "Urls not found" });
    }

    res.status(StatusCodes.OK).send(urls);
  } catch (error) {
    console.error("Error fetching data:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: error.message });
  }
});

router.get("/:shorterUrl", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summary = 'Redirect to the original url'
  try {
    const { shorterUrl } = req.params;
    const url = await findOneByShorterUrl(shorterUrl);

    if (!url) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: "Url not found" });
    }

    const directUrl = url.originalUrl;

    res.status(StatusCodes.OK).redirect(directUrl);
  } catch (error) {
    console.error("Error fetching data:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: error.message });
  }
});

router.post("/createUrl", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summary = 'Creates a new shorter url'
  try {
    const { originalUrl, shorterUrl } = req.body;
    const newUrl = await addNewUrl(originalUrl, shorterUrl);

    if (newUrl === StatusCodes.CONFLICT) {
      return res
        .status(StatusCodes.CONFLICT)
        .send({ message: "Shorter url already exist" });
    }

    res.status(StatusCodes.CREATED).send(newUrl);
  } catch (error) {
    console.error("Error creating url:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: error.message });
  }
});

//change it because i changed the service
router.patch("/modifyUrl", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summary = 'Updates an existing URL'
  try {
    const { shorterUrl, newOriginalUrl } = req.body;
    const newUrl = await modifyOriginalUrl(shorterUrl, newOriginalUrl);

    if (!newUrl) {
      return res
        .status(StatusCodes.CONFLICT)
        .send({ message: "New original url already exist" });
    }

    res.status(StatusCodes.OK).send(newUrl);
  } catch (error) {
    console.error("Error update url:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: error.message });
  }
});

router.delete("/deleteUrl/:shortUrl", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summary = 'Deleting an existing URL'
  try {
    const { shortUrl } = req.params;

    const deletedUrl = await deleteUrl(shortUrl);

    if (deletedUrl === StatusCodes.NOT_FOUND) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: "Url not found" });
    }

    res
      .status(StatusCodes.OK)
      .send({ message: `${shortUrl} deleted successfully` });
  } catch (error) {
    console.error("Error deleting url:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: error.message });
  }
});

router.get("/startWith/:startWith", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summury = Gets all the short urls that starts with a specific word/letter
  try {
    const { startWith } = req.params;
    const urls = urlsStartsWith(startWith);

    if (!urls) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: "Urls not found" });
    }

    res.send(StatusCodes.OK).send(urls);
  } catch (error) {
    console.error("Error fetching data:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: error.message });
  }
});

router.get("/contains/:contains", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summury = Gets all the short urls that contains a specific word/letter
  try {
    const { contains } = req.params;
    const urls = urlsContains(contains);

    if (!urls) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: "Urls not found" });
    }

    res.send(StatusCodes.OK).send(urls);
  } catch (error) {
    console.error("Error fetching data:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: error.message });
  }
});

router.get("/noContains/:noContains", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summury = Gets all the short urls that contains a specific word/letter
  try {
    const { noContains } = req.params;
    const urls = urlsNoContains(noContains);

    if (!urls) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: "Urls not found" });
    }

    res.send(StatusCodes.OK).send(urls);
  } catch (error) {
    console.error("Error fetching data:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: error.message });
  }
});

module.exports = router;
