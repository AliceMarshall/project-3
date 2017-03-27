const rp = require('request-promise');
const Promise = require('bluebird');

function cinemasIntersect(req, res) {
  const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

  Promise.props({
    locationA: rp({
      method: 'GET',
      url: baseUrl,
      qs: {
        location: '51.544220,-0.146983',
        radius: 5000,
        types: 'movie_theater',
        key: 'AIzaSyDk6chpvhQ_n1eKCKyAV_QaUIWgi9fHF3Y'
      },
      json: true
    }),
    locationB: rp({
      method: 'GET',
      url: baseUrl,
      qs: {
        location: '51.544235,-0.051672',
        radius: 5000,
        types: 'movie_theater',
        key: 'AIzaSyDk6chpvhQ_n1eKCKyAV_QaUIWgi9fHF3Y'
      },
      json: true
    })

  })
  .then((result) => {
    //{ locationA: { results: [{},{}] }, locationB: { results: [{},{}] } };
    // return result;
    // do your intersection functionality
    const resultSet = result.locationA.results.concat(result.locationB.results);
    const ids = [];
    const filteredResults = resultSet.filter((obj) => {
      if(ids.includes(obj.place_id)) {
        return true;
      } else {
        ids.push(obj.place_id);
        return false;
      }
    });
    res.json(filteredResults);
  });
}

module.exports = {
  cinemasIntersect
};
