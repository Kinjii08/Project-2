const express = require("express");
const router = express.Router();
const APIUser = require("./api_user");
<<<<<<< HEAD
const APIuniversity = require("./../models/university");
=======
const APIuniversity = require("../models/university");
const passport = require("passport");
>>>>>>> 7e27453ff3e1f77221e1cbad57ea34850ed909fb

//Passport Login
router.get("/login", (req, res, next) => {
  res.render("login.hbs");
});

router.get("/login", (req, res, next) => {
  res.render("/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

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

      newUser.save(err => {
        if (err) {
          res.render("/signup", { message: "Something went wrong" });
        } else {
          res.redirect("/");
        }
      });
    })
    .catch(error => {
      next(error);
    });
});

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
  APIuniversity.getOne(req.params.id)
    .then(school => res.render("university_profile", { school }))
    .catch(dberr => res.send(dberr));
});

router.get("/university_profile/edit/:id", (req, res) => {
  APIuniversity.getOne(req.params.id)
    .then(school => res.render("university_edit", { school }))
    .catch(dberr => res.send(dberr));
});

router.post("/university_profile/edit/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body); //body contient les data du formulaires school
  APIuniversity.updateOne(req.params.id, req.body)
    .then(() => res.redirect("/university_profile/edit/" + req.params.id))
    .then(err => res.redirect("/university_profile/edit/"));
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
