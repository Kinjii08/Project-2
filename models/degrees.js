const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const degreesSchema = new Schema({
  name: {
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

const degreesModel = mongoose.model("Degrees", degreesSchema);

module.exports = degreesModel;
