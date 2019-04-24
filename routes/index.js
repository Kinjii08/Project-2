const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Linked" });
});

router.get("/about", (req, res, next) => {
  res.render("about.hbs");
});

module.exports = router;
