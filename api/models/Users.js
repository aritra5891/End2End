const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  profile : {type: Boolean, default: false}
});

module.exports = mongoose.model('Users', UserSchema);