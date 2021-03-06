const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const APIUser = require("./api_user");
const APIuniversity = require("./api_university");
const APIdegrees = require("./api_degrees");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const secure = require("connect-ensure-login");
const bcryptSalt = 10;

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  APIUser.getBy({ id })
    .then(user => cb(null, user))
    .catch(err => cb(err));
});

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, next) => {
    APIUser.getBy({ email })
      .then(user => {
        if (!user) {
          console.log("user mail not found");
          next(null, false, { message: "Incorrect username" });
          return;
        }
        if (!bcrypt.compareSync(password, user.password)) {
          console.log("Incorrect password");
          next(null, false, { message: "Incorrect password" });
          return;
        }
        console.log("all good", user);
        next(null, user);
      })
      .catch(err => {
        next(err);
      });
  })
);

//Passport Login
router.get("/login", (req, res, next) => {
  res.render("login.hbs");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/user_profile",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

// post te permet de récupérer les infos du formulaire de signup
router.post("/signup", (req, res, next) => {
  const name = req.body.name;
  const lastname = req.body.lastname;
  const age = req.body.age;
  const gender = req.body.gender;
  const role = req.body.role;
  const website = req.body.website;
  const university = req.body.university;
  const email = req.body.email;
  const degree = req.body.degree;
  const password = req.body.password;

  if (email === "" || password === "") {
    res.render("form_user", { message: "Indicate email and password" });
    return;
  }

  APIUser.getBy({ email })
    .then(user => {
      console.log(user);

      if (user !== null) {
        res.render("form_user", { message: "The username already exists" });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      APIUser.create({
        name,
        lastname,
        age,
        gender,
        email,
        role,
        website,
        university,
        degree,
        password: hashPass
      })
        .then(dbRes => {
          res.redirect("login");
        })
        .catch(dbErr => {
          console.log(dbErr);
          res.render("form_user", { message: "Something went wrong" });
        });
    })
    .catch(error => {
      next(error);
    });
});

// get te permet de servir les pages
router.get("/signup", (req, res, next) => {
  Promise.all([APIuniversity.getAll(), APIdegrees.getAll()]).then(results => {
    console.log(results)
    const universities = results[0];
    const degrees = results[1];
    res.render("form_user.hbs", { universities, degrees });
  })
  // APIuniversity.getAll().then(universities => {
  //   console.log("universities =", universities);
  //   APIdegrees.getAll().then(degrees => {
  //     console.log("degrees =", degrees);
  
  //   });
  // });
});

router.get("/signup-pro", (req, res, next) => {
  res.render("form_pro.hbs");
});

// router.get("/user_profile", secure.ensureLoggedIn(), (req, res) => {
router.get("/user_profile", (req, res) => {
  console.log("voilou", req.user);
  res.render("user_profile", req.user);
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
    .then(school => res.render("school_profile", { school }))
    .catch(dberr => res.send(dberr));
});

router.get("/school_profile/edit/:id", (req, res) => {
  APIuniversity.getOne(req.params.id)
    .then(school => res.render("school_edit", { school }))
    .catch(dberr => res.send(dberr));
});

router.post("/university_profile/edit/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body); //body contient les data du formulaires school
  APIuniversity.updateOne(req.params.id, req.body)
    .then(() => res.redirect("/school_profile/edit/" + req.params.id))
    .then(err => res.redirect("/school_profile/edit/"));
});

router.get("/signout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
