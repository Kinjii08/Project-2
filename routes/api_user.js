const userModel = require("./../models/user");
const express = require("express");
const router = new express.Router();

const getAll = () => userModel.find();

const create = (data) => userModel.create(data);

router.get("/all", (req, res) => {
  getAll()
  .then(users => res.send(users))
  .catch(dberr => res.send(dberr))
});


router.post("/create", (req, res) => {
  create(req.body)
  .then(user => res.send(user))
  .catch(dberr => res.send(dberr))
});

module.exports = router;
