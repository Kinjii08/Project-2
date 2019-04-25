const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", { title: "BeeRinkU" });
});

router.get("/about", (req, res, next) => {
  res.render("about.hbs");
});

router.get("/contact", (req, res, next) => {
  res.render("contact.hbs");
});

module.exports = router;
