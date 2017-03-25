const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true},
  password: {type: String, required: true},
  address: { type: String },
  geometry: {
    lat: { type: Number },
    lng: { type: Number }
  }
});

module.exports = mongoose.model('User', userSchema);
