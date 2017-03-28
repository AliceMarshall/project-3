const rp = require('request-promise');
const Promise = require('bluebird');

function cinemasIntersect(req, res, next) {
  const lat = ((req.query.userLat-req.query.dateLat)/2)+req.query.dateLat;
  const lng = ((req.query.userLng-(req.query.dateLng))/2)+(req.query.dateLng);
  const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
  const params = {
    method: 'GET',
    url: baseUrl,
    json: true,
    qs: {
      radius: 5000,
      type: 'movie_theater',
      rankby: '',
      key: 'AIzaSyAemSTnCL0-3NFaqhikgPtwDcFB1uRM9Eg'
    }
  };

  function getAllResults(lat, lng) {
    params.qs.location = `${lat},${lng}`;
    let allResults = [];
    return new Promise((resolve, reject) => {

      function makeRequest() {
        rp(params)
          .then((response) => {
            // console.log(response);
            if(response.status === 'INVALID_REQUEST') return makeRequest();
            if(response.status !== 'OK') reject(new Error(response.status));

            allResults = allResults.concat(response.results);

            if(response.next_page_token) {
              params.qs.pagetoken = response.next_page_token;
              return makeRequest();
            }

            return resolve(allResults);
          });
      }

      makeRequest();
    });
  }

  Promise.props({
    location: getAllResults(lat, lng)
    // locationB: getAllResults(req.query.userLat, req.query.userLng)
  })
  .then((response) => {
    console.log(response.location.length);
    const resultSet = response.location;
    // const resultSet = response.locationA.concat(response.locationB);
    // const ids = [];
    // const filteredResults = resultSet.filter((obj) => {
    //   if(ids.includes(obj.place_id)) {
    //     return true;
    //   } else {
    //     ids.push(obj.place_id);
    //     return false;
    //   }
    //
    // });
    res.json(resultSet);
  })
  .catch(next);
}

module.exports = {
  cinemasIntersect
};
