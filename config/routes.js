const router = require('express').Router();
const dateNight = require('../controllers/dateNight');
const auth = require('../controllers/auth');
const imageUpload = require('../lib/imageUpload');
const secureRoute = require('../lib/secureRoute');

router.route('/dateNight')
  .get(dateNight.index)
  .post(secureRoute, imageUpload, dateNight.create);

router.route('/dateNight/:id')
  .get(secureRoute, dateNight.show)
  .delete(secureRoute, dateNight.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
