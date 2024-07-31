const express = require("express");
const router = express.Router();
const {
  getUrls,
  findOneByShortenerUrl,
  createUrl,
  modifyUrl,
  deleteUrl,
  urlsStartsWith,
  urlsContains,
  urlsNoContains,
} = require("../services/urls");

router.get("/all", async (_, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summary = 'Gets all urls'
  try {
    const urls = await getUrls();

    if (!urls) {
      return res.status(404).send({ message: "Urls not found" });
    }

    res.status(200).send(urls);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/:shortenerUrl", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summary = 'Redirect to the original url'
  try {
    const { shortenerUrl } = req.params;
    const url = await findOneByShortenerUrl(shortenerUrl);

    if (!url) {
      return res.status(404).send({ message: "Url not found" });
    }

    const directUrl = url.originalUrl;

    res.status(200).redirect(directUrl);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/createUrl", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summary = 'Creates a new shortener url'
  try {
    const { originalUrl, shortenerUrl } = req.body;
    const newUrl = await createUrl(originalUrl, shortenerUrl);

    if (!newUrl) {
      return res.status(409).send({ message: "Shortener url already exist" });
    }

    res.status(200).send(newUrl);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.patch("/modifyUrl", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summary = 'Updates an existing URL'
  try {
    const { shortenerUrl, newShortenerUrl } = req.body;
    const newUrl = await modifyUrl(shortenerUrl, newShortenerUrl);

    if (newUrl === "noUrl") {
      return res.status(404).send({ message: "Url not found" });
    } else if (newUrl === "newUrlExist") {
      return res
        .status(409)
        .send({ message: "New shortener url already exist" });
    }

    res.status(200).send(newUrl);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.delete("/deleteUrl/:shortUrl", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summary = 'Deleting an existing URL'
  try {
    const { shortUrl } = req.params;

    const deletedUrl = await deleteUrl(shortUrl);

    if (deletedUrl === "not found") {
      return res.status(404).send({ message: "Url not found" });
    }

    res.status(200).send({ message: `${shortUrl} deleted successfully` });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/startWith/:startWith", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summury = Gets all the short urls that starts with a specific word/letter
  try {
    const { startWith } = req.params;
    const urls = urlsStartsWith(startWith);

    if (!urls) {
      return res.status(404).send({ message: "Urls not found" });
    }

    res.send(200).send(urls);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/contains/:contains", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summury = Gets all the short urls that contains a specific word/letter
  try {
    const { contains } = req.params;
    const urls = urlsContains(contains);

    if (!urls) {
      return res.status(404).send({ message: "Urls not found" });
    }

    res.send(200).send(urls);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/noContains/:noContains", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summury = Gets all the short urls that contains a specific word/letter
  try {
    const { noContains } = req.params;
    const urls = urlsNoContains(noContains);

    if (!urls) {
      return res.status(404).send({ message: "Urls not found" });
    }

    res.send(200).send("heyy");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
