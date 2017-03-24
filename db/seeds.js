const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const DateNight = require('../models/dateNight');
const User = require('../models/user');
const { dbURI } = require('../config/environment');

mongoose.connect(dbURI);

User.collection.drop();
DateNight.collection.drop();

User
  .create([{
    username: 'Ben',
    email: 'ben@ben',
    password: 'password',
    passwordConfirmation: 'password'
  }, {
    username: 'Guv',
    email: 'guv@guv',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created!`);

    return DateNight
      .create([{
        nameOfDate: 'Fab',
        when: '2017-03-24',
        image: '',
        rating: 2,
        comments: '',
        complete: true,
        createdBy: users[0]
      },{
        nameOfDate: 'James',
        when: '2017-03-22',
        image: '',
        rating: 5,
        comments: '',
        complete: true,
        createdBy: users[1]
      }]);
  })
  .then((dateNight) => {
    console.log(`${dateNight.length} dates created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
