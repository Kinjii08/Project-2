const express = require("express");
const router = new express.Router();


router.get("/", (req, res) => {
  res.redirect('/home')
})

router.get("/home", (req, res) => {
  res.send("home.hbs")
})


router.get("/login", (req, res) => {
  res.send("login.hbs")
})