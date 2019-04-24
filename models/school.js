const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schoolSchema = new Schema({
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

  degree: {
    type: String,
    enum: ["High School Degree", "Bachelor", "Master", "MBA", "PhD"],
    required: true
  }
});

const SchoolModel = mongoose.model("School", schoolSchema);

module.exports = SchoolModel;
