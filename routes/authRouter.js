const express = require("express");
const router = express.Router();
const APIUser = require("./api_user");
const APISchool = require("./api_university");

router.get("/login", (req, res, next) => {
  res.render("login.hbs");
});

// post te permet de récupérer les infos du formulaire de signup
router.post("/signup", (req, res) => {});

// get te permet de servir les pages
router.get("/signup", (req, res, next) => {
  res.render("signUpForm.hbs");
});

router.get("/user_profile/:id", (req, res) => {
  APIUser.getOne(req.params.id)
    .then(user => res.render("user_profile", { user }))
    .catch(dberr => res.send(dberr));
});

router.get("/user_profile/edit/:id", (req, res) => {
  APIUser.getOne(req.params.id)
    .then(user => res.render("user_edit", { user }))
    .catch(dberr => res.send(dberr));
});

router.post("/user_profile/edit/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body); //body contient les data du formulaires profile
  APIUser.updateOne(req.params.id, req.body)
    .then(() => res.redirect("/user_profile/edit/" + req.params.id))
    .then(err => res.redirect("/user_profile/edit/"));
});

router.get("/university-profile/:id", (req, res) => {
  APISchool.getOne(req.params.id)
    .then(school => res.render("university_profile", { school }))
    .catch(dberr => res.send(dberr));
});

router.get("/university_profile/edit/:id", (req, res) => {
  APISchool.getOne(req.params.id)
    .then(school => res.render("university_edit", { school }))
    .catch(dberr => res.send(dberr));
});

router.post("/university_profile/edit/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body); //body contient les data du formulaires school
  APISchool.updateOne(req.params.id, req.body)
    .then(() => res.redirect("/university_profile/edit/" + req.params.id))
    .then(err => res.redirect("/university_profile/edit/"));
});

module.exports = router;
