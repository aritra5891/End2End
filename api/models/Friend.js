const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const FriendSchema = new Schema({
  profile_id: { type: String, required: true },
  request_by: { type : Array, "default" : [], required: false },
  friends_id: { type : Array, "default" : [], required: false },
  request_to: { type : Array, "default" : [], required: false },
});

module.exports = mongoose.model('Friend', FriendSchema);