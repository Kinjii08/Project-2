const userModel = require("./../models/user");
const express = require("express");
const router = new express.Router();

const create = data => userModel.create(data);
const getAll = () => userModel.find();
const getOne = id => userModel.findById(id);
const getBy = data => userModel.findOne(data);
const deleteOne = id => userModel.findByIdAndDelete(id);
const updateOne = id => userModel.findByIdAndUpdate(id);

router.post("/create", (req, res) => {
  create(req.body)
    .then(user => res.send(user))
    .catch(dberr => res.send(dberr));
});

router.get("/all", (req, res) => {
  getAll()
    .then(user => res.send(user))
    .catch(dberr => res.send(dberr));
});

router.get("/:id", (req, res) => {
  getOne(req.params, id)
    .then(user => res.send(user))
    .catch(dberr => res.send(dberr));
});

router.delete("/:id", (req, res) => {
  deleteOne(req.params, id)
    .then(user => res.send(user))
    .catch(dberr => res.send(dberr));
});

//module.exports = router;

module.exports = {
  create,
  deleteOne,
  getAll,
  getBy,
  getOne,
  updateOne,
  router
};
