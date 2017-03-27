const rp = require('request-promise');

function film(req, res) {
  const baseUrl = 'http://api.cinelist.co.uk/search/cinemas/coordinates/51.525493/-0.0822173';

  rp({
    method: 'GET',
    url: `${baseUrl}`,
    // qs: {
    //   location: 'lat' /'lng' '51.544220,-0.146983',
    // }, going to need to grab lat lng and append to the baseURl
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
  film
};

//tomorrow set up a request for the film times, pass in cinema id, which is grabbed from the first request.
