const rp = require('request-promise');
const Promise = require('bluebird');

function restaurants(req, res, next) {
  const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
  const params = {
    method: 'GET',
    url: baseUrl,
    json: true,
    qs: {
      radius: 2000,
      types: 'restaurant',
      rankby: '',
      key: 'AIzaSyDfhMcvyXqnc1SJ-fShGvO6_iAD45aU6mo'
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
    location: getAllResults(req.query.lat, req.query.lng)
  })
  .then((response) => {
    // console.log(response);
    const resultSet = response.location;

    res.json(resultSet);
  })
  .catch(next);
}

module.exports = {
  restaurants
};
