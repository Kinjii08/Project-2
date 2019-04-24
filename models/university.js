const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const universitySchema = new Schema({
  name: {
    type: String,
    required: true
  },

  DateOfCreation: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  website: {
    address: Object
  },

  field: {
    type: String,
    enum: ["Art", "Business", "Web developement"],
    required: true
  },

  degrees: {
    type: String,
    enum: ["High School Degree", "Bachelor", "Master", "MBA", "PhD"],
    required: true
  }
});

const universityModel = mongoose.model("School", universitySchema);

module.exports = universityModel;
