const express = require("express");
const router = new express.Router();

router.get("/", (req, res) => {
  res.redirect("/home");
});

router.get("/home", (req, res) => {
  res.send("home.hbs");
});

router.get("/login", (req, res) => {
  res.send("login.hbs");
});

router.get("/signup ", (req, res) => {
  res.send("form_user.hbs");
});

router.get("/about", (req, res) => {
  res.render("about.hbs");
});

router.get("/user_edit", (req, res) => {
  res.render("user_edit.hbs");
});

router.get("/university_edit", (req, res) => {
  res.render("university_edit.hbs");
});

router.get("/university_profile", (req, res) => {
  res.render("university_profile.hbs");
});

router.get("/contact", (req, res) => {
  res.render("contact.hbs");
});

module.exports = router;
