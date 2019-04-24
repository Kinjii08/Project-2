const express = require("express");
const router = new express.Router(); 
const userAPI = require("./api_user"); 



router.get("/create", (req, res) => {
  res.render("dashboard/user", {
    isForm: true,
    msg: res.locals.flashMessage
  });
});

module.exports = router