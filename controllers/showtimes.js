const rp = require('request-promise');

function showtimes(req, res) {
  const baseUrl = 'http://api.cinelist.co.uk/get/times/cinema/7530';

  rp({
    method: 'GET',
    url: `${baseUrl}`,
    // qs: {
    //   pass in cinema id, 
    // },
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
  showtimes
};
