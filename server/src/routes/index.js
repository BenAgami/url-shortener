const express = require("express");
const router = express.Router();

router.get("/url", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summury = Gets all the objects, their ids, original urls, short urls
});

router.post("/url/createShortUrl/:originalUrl", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summury = Creates a new object which contains everything I wrote above
});

router.get("/url/startWith/:startWith", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summury = Gets all the short urls that starts with a specific word/letter
});

router.get("/url/contains/:contains", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summury = Gets all the short urls that contains a specific word/letter
});

router.get("/url/noContains/:noContains", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summury = Gets all the short urls that contains a specific word/letter
});

module.exports = router;
