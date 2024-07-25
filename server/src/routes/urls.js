const express = require("express");
const router = express.Router();
const Url = require("../utils/models/url");

router.get("/all", async (_, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summary = 'Gets all urls'
  try {
    const data = await Url.findAll();

    if (!data) {
      res.status(404).send({ message: "Urls not found" });
    }

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: { error } });
  }
});

router.get("/:shortUrl", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summary = 'Redirect to the original url'
  try {
    const { shortUrl } = req.params;
    const url = await Url.findOne({ shortenerUrl: shortUrl });

    if (!url) {
      res.status(404).send({ message: "Url not found" });
    }

    const directUrl = url.originalUrl;

    res.status(200).redirect(directUrl);
  } catch (error) {
    res.status(500).send({ error: { error } });
  }
});
router.post("/", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summary = 'Creates a new shortener url'
  try {
    const { originalUrl, shortenerUrl } = req.body;
    const url = await Url.findOne({ shortenerUrl: shortenerUrl });
    if (url) {
      res.status(409).send({ message: "Shortener url is already exists" });
    }
    const newUrl = await Url.create({ originalUrl, shortenerUrl });

    res.status(200).send(newUrl);
  } catch (error) {
    res.status(500).send({ error: { error } });
  }
});

router.patch("/", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summary = 'Updates an existing URL'
  try {
    const { originalUrl } = req.body;

    res.status(200).send({ message: "Successfully updated" });
  } catch (error) {
    res.status(500).send({ error: { error } });
  }
});

router.delete("/deleteUrl/:urlId", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summary = 'Deleting an existing URL'
  try {
    const urlId = req.params.urlId;
    const deletedUrl = await Url.findByPk(urlId);

    if (!deletedUrl) {
      res.status(404).send({ message: "Url not found" });
    }

    await deletedUrl.destroy();

    res.status(200).send(deletedUrl);
  } catch (error) {
    res.status(500).send({ error: { error } });
  }
});

router.get("/startWith/:startWith", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summury = Gets all the short urls that starts with a specific word/letter
});

router.get("/contains/:contains", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summury = Gets all the short urls that contains a specific word/letter
});

router.get("/noContains/:noContains", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summury = Gets all the short urls that contains a specific word/letter
});

module.exports = router;
