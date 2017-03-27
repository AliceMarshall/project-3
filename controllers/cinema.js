const rp = require('request-promise');
// const Promise = require('bluebird');

/*
Promise.props({
  locationA: rp({
      method: 'GET',
      url: `${baseUrl}`,
      qs: {
        location: `${req.query.locationA}`,
        radius: 5000,
        types: 'movie_theater',
        key: 'AIzaSyDk6chpvhQ_n1eKCKyAV_QaUIWgi9fHF3Y'
      },
      json: true
    }),
  locationB: rp({
      method: 'GET',
      url: `${baseUrl}`,
      qs: {
        location: `${req.query.locationB}`,
        radius: 5000,
        types: 'movie_theater',
        key: 'AIzaSyDk6chpvhQ_n1eKCKyAV_QaUIWgi9fHF3Y'
      },
      json: true
    })
})
.then((result) => {
  console.log(result); { locationA: [{},{}], locationB: [{},{}] };

  // do your intersection functionality

  // return just the intersected results
})
*/

function cinemas(req, res) {
  const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

  rp({
    method: 'GET',
    url: baseUrl,
    qs: {
      location: `${req.query.location}`,
      radius: 5000,
      types: 'movie_theater',
      key: 'AIzaSyDk6chpvhQ_n1eKCKyAV_QaUIWgi9fHF3Y'
    },
    json: true
  })
  .then((response) => {
    res.status(200).json(response);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
}

module.exports = {
  cinemas
};
