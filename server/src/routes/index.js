const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summury = Gets all the objects, their ids, original urls, short urls
});

router.post("/createShortUrl/:originalUrl", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summury = Creates a new object which contains everything I wrote above
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
