const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const companySchema = new Schema({
  name: {
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

  website: {
    address: Object,
  },


});

const CompanyModel = mongoose.model("User", companySchema);

module.exports = CompanyModel;