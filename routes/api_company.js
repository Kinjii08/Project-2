const companyModel = require("./../models/school");
const express = require("express");
const router = new express.Router();

const create = data => companyModel.create(data);
const getAll = () => companyModel.find();
const getOne = id => companyModel.findById(id);
const getBy = data => companyModel.findOne(data);
const deleteOne = id => companyModel.findByIdAndDelete(id);
const updateOne = id => companyModel.findByIdAndUpdate(id);

router.post("/create", (req, res) => {
  create(req.body)
    .then(company => res.send(company))
    .catch(dberr => res.send(dberr));
});

router.get("/all", (req, res) => {
  getAll()
    .then(company => res.send(company))
    .catch(dberr => res.send(dberr));
});

router.get("/:id", (req, res) => {
  getOne(req.params.id)
    .then(company => res.send(company))
    .catch(dberr => res.send(dberr));
});

router.delete("/:id", (req, res) => {
  deleteOne(req.params.id)
    .then(company => res.send(company))
    .catch(dberr => res.send(dberr));
});

router.patch("/:id", (req, res) => {
  updateOneOne(req.params.id)
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
