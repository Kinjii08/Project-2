const express = require("express");
const router = express.Router();
const APIUser = require("./api_user");
const APISchool = require("./api_school");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");


//Passport Login 
router.get("/login", (req, res, next) => {
  res.render("login.hbs");
});

authRoutes.get("/login", (req, res, next) => {
  res.render("/login");
});

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

// post te permet de récupérer les infos du formulaire de signup
router.post("/signup", (req, res) => {
const email = req.body.email;
const password = req.body.password;

if (username === "" || password === "") {
  res.render("/signup", { message: "Indicate username and password" });
  return;
}

User.findOne({ username })
.then(user => {
  if (user !== null) {
    res.render("/signup", { message: "The username already exists" });
    return;
  }

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  const newUser = new User({
    email,
    password: hashPass
  });

  newUser.save((err) => {
    if (err) {
      res.render("/signup", { message: "Something went wrong" });
    } else {
      res.redirect("/");
    }
  });
})
.catch(error => {
  next(error)
})

});

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
  console.log(req.body); //body contient les data du formulaires profile
  APIUser.updateOne(req.params.id, req.body)
    .then(() => res.redirect("/user-profile/edit/" + req.params.id))
    .then(err => res.redirect("/user-profile/edit/"));
});

router.get("/university-profile/:id", (req, res) => {
  APISchool.getOne(req.params.id)
    .then(school => res.render("school-profile", { school }))
    .catch(dberr => res.send(dberr));
});

router.get("/university-profile/edit/:id", (req, res) => {
  APISchool.getOne(req.params.id)
    .then(school => res.render("school_edit", { school }))
    .catch(dberr => res.send(dberr));
});

router.post("/university-profile/edit/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body); //body contient les data du formulaires school
  APISchool.updateOne(req.params.id, req.body)
    .then(() => res.redirect("/university-profile/edit/" + req.params.id))
    .then(err => res.redirect("/university-profile/edit/"));
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
