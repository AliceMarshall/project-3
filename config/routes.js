const router = require('express').Router();
const dateNight = require('../controllers/dateNight');
const auth = require('../controllers/auth');
const cinema = require('../controllers/cinema');
const film = require('../controllers/film');
const showtimes = require('../controllers/showtimes');
const restaurant = require('../controllers/restaurant');
const imageUpload = require('../lib/imageUpload');
const users = require('../controllers/users');
// const secureRoute = require('../lib/secureRoute');

router.route('/dateNight')
  .get(dateNight.index)
  .post(imageUpload, dateNight.create);
  // .post(dateNight.create);

router.route('/dateNight/:id')
  .get(dateNight.show)
  .put(dateNight.update)
  .delete(dateNight.delete);

router.get('/cinemas', cinema.cinemasIntersect);

router.get('/films', film.film);

router.get('/showtimes', showtimes.showtimes);

router.get('/users', users.index);

router.route('/users/:id')
  .get(users.show)
  .delete(users.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
