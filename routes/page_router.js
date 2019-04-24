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
  res.send("signUpForm.hbs");
});

router.get("/about", (req, res) => {
  res.render("about.hbs");
});

router.get("/user_edit", (req, res) => {
  res.render("user_edit.hbs");
});

router.get("/user_profile", (req, res) => {
  res.render("user_profile.hbs");
});

router.get("/school_edit", (req, res) => {
  res.render("school_edit.hbs");
});

router.get("/school_profile", (req, res) => {
  res.render("school_profile.hbs");
});
