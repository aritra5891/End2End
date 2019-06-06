const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  picture: { type: String, required: false },
  profile_id : {type: String, required: true}
});

module.exports = mongoose.model('Profile', ProfileSchema);