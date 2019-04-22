const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schoolSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  
  email: {
    type: String,
    required: true
  },

  website: {
    address: Object,
  },

  degree: {
    type: String,
    enum: ['High School Degree', 'Bachelor', 'Master', 'MBA', 'PhD'],
    required: true
  },

});

const SchoolModel = mongoose.model("School", schoolSchema);

module.exports = SchoolModel;