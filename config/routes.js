const router = require('express').Router();
const dateNights = require('../controllers/dateNights');
const auth = require('../controllers/auth');
const imageUpload = require('../lib/imageUpload');
const secureRoute = require('../lib/secureRoute');

router.route('/dateNights')
  .get(dateNights.index)
  .post(secureRoute, imageUpload, dateNights.create);

router.route('/dateNights/:id')
  .get(secureRoute, dateNights.show)
  .delete(secureRoute, dateNights.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
