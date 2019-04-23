const express = require("express");
const router = express.Router();

router.get("/login", (req, res, next) => {
  res.render("login.hbs");
});

router.get("/signup", (req, res, next) => {
  res.render("formulaire.hbs");
});

module.exports = router;
