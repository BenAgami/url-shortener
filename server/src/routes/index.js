const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summary = 'Gets all urls'
});

router.post("/", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summary = 'Creates a new shortener url'
  const { originalUrl } = req.body;
});

router.patch("/", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summary = 'Updates an existing URL'
  const { originalUrl } = req.body;
});

router.delete("/", async (req, res) => {
  // #swagger.tags = ['URL']
  // #swagger.summary = 'Deleting an existing URL'
  const { originalUrl } = req.body;
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
