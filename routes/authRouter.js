const express = require("express");
const router = express.Router();

router.get("/login", (req, res, next) => {
  res.render("login.hbs");
});

router.get("/signup", (req, res, next) => {
  res.render("formulaire.hbs");
});

router.get("/about", (req, res, next) => {
  res.render("about.hbs");
});

module.exports = router;
