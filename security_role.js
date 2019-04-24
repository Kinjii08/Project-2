const express = require("express");
const router = new express.Router();
const userModel = require("./models/user");
const schoolModel = require("./models/university");
const schoolCompany = require("./models/company");

const checkStudent = checkRoles("student");
const checkPro = checkRoles("pro");
const checkUniversity = checkRoles("university");

router.get(
  "/private",
  checkRoles("student"),
  ensureAuthenticated,
  (req, res, next) => {
    res.render("private", { user: req.user });
  }
);

router.get(
  "/private",
  checkRoles("pro"),
  ensureAuthenticated,
  (req, res, next) => {
    res.render("private", { user: req.user });
  }
);

router.get(
  "/private",
  checkRoles("university"),
  ensureAuthenticated,
  (req, res, next) => {
    res.render("private", { user: req.user });
  }
);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }

  const userModel = mongoose.Schema({
    /// ...
    role: {
      type: String,
      enum: ["student", "university", "pro"],
      default: "student"
    }
  });

  const schoolModel = mongoose.Schema({
    /// ...
    role: {
      type: String,
      enum: ["student", "university", "pro"],
      default: "student"
    }
  });

  const companyModel = mongoose.Schema({
    /// ...
    role: {
      type: String,
      enum: ["student", "university", "pro"],
      default: "student"
    }
  });

  const userModel = Schema({
    name: String,
    email: String,
    desc: String,
    user: Schema.Types.ObjectId
  });

  const schoolModel = Schema({
    name: String,
    email: String,
    desc: String,
    university: Schema.Types.ObjectId
  });

  const companyModel = Schema({
    name: String,
    email: String,
    desc: String,
    company: Schema.Types.ObjectId
  });

  router.post("/student", ensureAuthenticated, (req, res, next) => {
    const newStudent = new student({
      name: req.body.name,
      desc: req.body.desc,
      student: req.user._id // <-- we add the user ID
    });

    newStudent.save(err => {
      if (err) {
        return next(err);
      } else {
        res.redirect("/student");
      }
    });
  });

  router.get("/student", ensureAuthenticated, (req, res, next) => {
    Room.find({ owner: req.user._id }, (err, myRooms) => {
      if (err) {
        return next(err);
      }

      res.render("student/index", { student: myRooms });
    });
  });

  function checkRoles(role) {
    return function(req, res, next) {
      if (req.isAuthenticated() && req.user.role === role) {
        return next();
      } else {
        res.redirect("/login");
      }
    };
  }

  router.get("/private", checkStudent, (req, res) => {
    res.render("private", { user: req.user });
  });

  router.get("/posts", checkPro, (req, res) => {
    res.render("private", { user: req.user });
  });

  router.get("/posts", checkUniversity, (req, res) => {
    res.render("private", { user: req.user });
  });
}
