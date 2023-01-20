// User Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    //required: true
  },
  surname: {
    type: String,
    //required: true
  },
  dob: {
    type: Date,
    //required: true
  },
  cnic: {
    type: Number,
    //required: true
  },
  passport: {
    type: String,
    //required: true
  },
  matric: {
    type: String,
    //required: true
  },
  inter: {
    type: String,
    //required: true
  },
  bachelors: {
    type: String,
    //required: true
  },
  statementOfPurpose: {
    type: String,
    //required: true
  },
  ieltsBands: {
    type: Number,
    //required: true
  }
});

module.exports = User = mongoose.model('users', UserSchema);
