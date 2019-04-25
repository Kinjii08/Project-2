const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const universitySchema = new Schema({
  name: {
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
    enum: ["Art", "Business", "Web developement", "IT"],
    required: true
  },

  degrees: {
    type: String,
    enum: [
      "High School Degree",
      "Certification",
      "Bachelor",
      "Master",
      "MBA",
      "PhD"
    ],
    required: true
  }
});

const universityModel = mongoose.model("University", universitySchema);

module.exports = universityModel;
