const degreesModel = require("./../models/degrees");
const express = require("express");
const router = new express.Router();

const create = data => degreesModel.create(data);
const getAll = () => degreesModel.find();
const getOne = id => degreesModel.findById(id);

// API //

router.post("/create", (req, res) => {
  create(req.body)
    .then(degree => res.send(degree))
    .catch(dberr => res.send(dberr));
});

router.get("/all", (req, res) => {
  getAll()
    .then(degrees => res.send(degrees))
    .catch(dberr => res.send(dberr));
});

router.get("/:id", (req, res) => {
  getOne(req.params.id)
    .then(degree => res.send(degree))
    .catch(dberr => res.send(dberr));
});

//module.exports = router;

module.exports = {
  create,
  getAll,
  getOne,
  router
};
