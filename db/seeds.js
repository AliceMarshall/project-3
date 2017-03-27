const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');
mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const User = require('../models/user');
const DateNight = require('../models/dateNight');

User.collection.drop();
DateNight.collection.drop();


User.create([{
  username: 'Sarah',
  email: 'email@hello',
  password: 'a',
  passwordConfirmation: 'a',
  address: 'GA',
  geometry: {
    lat: 51.515256,
    lng: -0.072662
  }
}])
.then((users) => {
  console.log(`${users.length} users created!`);

  return DateNight
  .create([{
    nameOfDate: 'David',
    when: 2017,
    image: '',
    rating: 10,
    comments: '',
    complete: true,
    cinema: {
      name: 'Ritzy',
      lat: 51.4612887,
      lng: -0.1169764,
      film: 'The Handmaids Tale'
    },
    restaurant: {
      name: 'Dip and Flip',
      lat: 51.4608224,
      lng: -0.1115101
    }
  }]);
})
.then((dateNights) => {
  console.log(`${dateNights.length} dateNights created!`);
})
.catch((err) => {
  console.log(err);
})
.finally(() => {
  console.log('Finally!');
  mongoose.connection.close();
});
