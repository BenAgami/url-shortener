const express = require("express");
const router = express.Router();

router.get("/url", (req, res) => {});

router.post("/url", (req, res) => {});

router.delete("/:shortUrl", (req, res) => {});

router.get("/:startWith", (req, res) => {});

router.get("/:contains", (req, res) => {});

router.get("/:noContains", (req, res) => {});

module.exports = router;
