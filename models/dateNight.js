const mongoose = require('mongoose');

const dateNightSchema = new mongoose.Schema({
  nameOfDate: { type: String },
  when: { type: Date },
  image: { type: String },
  rating: { type: Number },
  comments: { type: String },
  complete: { type: Boolean },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  cinema: {
    name: { type: String },
    lat: { type: Number },
    lng: { type: Number },
    film: { type: String}
  },
  restaurant: {
    name: { type: String },
    lat: { type: Number},
    lng: { type: Number }
  }
});

module.exports = mongoose.model('DateNight', dateNightSchema);
