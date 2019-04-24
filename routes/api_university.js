const universityModel = require("../models/university");
const express = require("express");
const router = new express.Router();

const create = data => universityModel.create(data);
const getAll = () => universityModel.find();
const getOne = id => universityModel.findById(id);
const getBy = data => universityModel.findOne(data);
const deleteOne = id => universityModel.findByIdAndDelete(id);
const updateOne = (id, data) =>
  universityModel.findByIdAndUpdate({ _id: id }, { ...data });

router.post("/create", (req, res) => {
  create(req.body)
    .then(university => res.send(university))
    .catch(dberr => res.send(dberr));
});

router.get("/all", (req, res) => {
  getAll()
    .then(university => res.send(university))
    .catch(dberr => res.send(dberr));
});

router.get("/:id", (req, res) => {
  getOne(req.params, id)
    .then(university => res.send(university))
    .catch(dberr => res.send(dberr));
});

router.delete("/:id", (req, res) => {
  deleteOne(req.params, id)
    .then(university => res.send(university))
    .catch(dberr => res.send(dberr));
});

router.patch("/:id", (req, res) => {
  updateOneOne(req.params.id)
    .then(university => res.send(university))
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
