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
city: {
  type: String,
  required: true
},
school: {
  type: String,
  required: true
},

graduationYear:{
  type:Date,
  required:true
},

StudyField:{
type: String,
required:true
},

gender: {
  type: string,
  required: true

},

languages: {
  type:string,
  required:true
}, 

experience: {
type:Object,
required:true
},


availability: {
  type: Date,
  required:true
}, 


aboutme: {
type: string,
required:true

},


whatIamSeeking: {
type:string, 
required:true
},

age: {
type: Number,
required: true

},

website: {
address: Object,
required:true
}, 



