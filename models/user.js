const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },

  field: {
    type: String,
    required: true
  },

  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true
  },

  age: {
    type: Number,
    required: true
  },

  website: String,

  birthday: {
    type: Date,
    required: true
  },

  degree: {
    type: String,
    enum: ["High School Degree", "Bachelor", "Master", "MBA", "PhD"],
    required: true
  },

  skills: {
    type: String
  },

  role: {
    type: String,
    enum: ["Student", "Teacher"],
    required: true,
    default: "Student"
  }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
