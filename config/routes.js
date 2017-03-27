const router = require('express').Router();
const dateNight = require('../controllers/dateNight');
const auth = require('../controllers/auth');
const cinema = require('../controllers/cinema');
const imageUpload = require('../lib/imageUpload');
const users = require('../controllers/users');
// const secureRoute = require('../lib/secureRoute');

router.route('/dateNight')
  .get(dateNight.index)
  .post(imageUpload, dateNight.create);
  // .post(dateNight.create);

router.route('/dateNight/:id')
  .get( dateNight.show)
  .delete( dateNight.delete);

router.get('/cinemas', cinema.cinemasIntersect);
router.route('/users/:id')
  .get(users.show)
  .delete(users.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
