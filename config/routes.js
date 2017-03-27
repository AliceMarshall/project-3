const router = require('express').Router();
const dateNight = require('../controllers/dateNight');

router.get('/cinemas', dateNight.cinemas);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
