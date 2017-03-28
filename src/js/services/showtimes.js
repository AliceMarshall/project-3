angular
  .module('dateApp')
  .service('showtimes', Showtimes);

Showtimes.$inject = ['$http'];
function Showtimes($http) {
  this.moviesIndex = function moviesIndex() {
    return $http
            .get('/api/showtimes')
            .then((response) => {
              const moviesListing = {};
              moviesListing.movietimes = response.data.listings;
              // console.log(moviesListing.movietimes);
              return moviesListing;
            });

  };

}
