const express = require("express");
const router = new express.Router(); 
const userAPI = require("./api_user"); 



router.get("/create", (req, res) => {
  res.render("profile/user", {
    isForm: true,
    msg: res.locals.flashMessage
  });
});

router.get("/:id/details", (req, res) => {
  userAPI
    .getOne(req.params.id)
    .then(user => {
      res.render("profile/details_user", { user });
    })
    .catch(err => {
      res.render("profile/details_user", { msg: "db problem" });
    });
});


router.post("/", (req, res) => {
  userAPI
    .create(req.body)
    .then(dbSuccess => {
      req.session.flashMessage = {
        status: "success",
        txt: "Yay !! user successfully created"
      };
      res.redirect("/profile/user/create");
    })
    .catch(dbErr => {
      req.session.flashMessage = {
        status: "error",
        txt: "Nay !! database issue while creating user",
        details: dbErr._message
      };
      res.redirect("/profile/user/create");
    });
});

module.exports = router;

module.exports = router