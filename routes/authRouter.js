const express = require("express");
const router = express.Router();
const APIUser = require("./api_user");
const APISchool = require("./api_school");

router.get("/login", (req, res, next) => {
  res.render("login.hbs");
});

// post te permet de récupérer les infos du formulaire de signup
router.post("/signup", (req, res) => {});

// get te permet de servir les pages
router.get("/signup", (req, res, next) => {
  res.render("signUpForm.hbs");
});

router.get("/user-profile/:id", (req, res) => {
  APIUser.getOne(req.params.id)
    .then(user => res.render("user_profile", { user }))
    .catch(dberr => res.send(dberr));
});

router.get("/user-profile/edit/:id", (req, res) => {
  APIUser.getOne(req.params.id)
    .then(user => res.render("user_edit", { user }))
    .catch(dberr => res.send(dberr));
});

router.post("/user-profile/edit/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body); //body contient les data du formulaires
});

router.get("/university-profile/:id", (req, res) => {
  APISchool.getOne(req.params.id)
    .then(university => res.render("university_profile", { university }))
    .catch(dberr => res.send(dberr));
});

router.get("/university-profile/edit/:id", (req, res) => {
  APISchool.getOne(req.params.id)
    .then(university => res.render("university_edit", { university }))
    .catch(dberr => res.send(dberr));
});

router.post("/university-profile/edit/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body); //body contient les data du formulaires
});

module.exports = router;
