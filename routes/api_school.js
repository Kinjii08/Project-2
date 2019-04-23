const schoolModel = require("./../models/school");
const express = require("express");
const router = new express.Router();

const create = data => schoolModel.create(data);
const getAll = () => schoolModel.find();
const getOne = id => schoolModel.findById(id);
const getBy = data => schoolModel.findOne(data);
const deleteOne = id => schoolModel.findByIdAndDelete(id);
const updateOne = id => schoolModel.findByIdAndUpdate(id);

router.post("/create", (req, res) => {
  create(req.body)
    .then(school => res.send(school))
    .catch(dberr => res.send(dberr));
});

router.get("/all", (req, res) => {
  getAll()
    .then(school => res.send(school))
    .catch(dberr => res.send(dberr));
});

router.get("/:id", (req, res) => {
  getOne(req.params, id)
    .then(school => res.send(school))
    .catch(dberr => res.send(dberr));
});

router.delete("/:id", (req, res) => {
  deleteOne(req.params, id)
    .then(school => res.send(school))
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
