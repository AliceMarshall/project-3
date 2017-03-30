angular
  .module('dateApp')
  .service('restaurants', Restaurants);

Restaurants.$inject = ['$http'];
function Restaurants($http) {
  this.getRestaurants = function getRestaurants(userLat, userLng) {
    return $http
            .get('/api/restaurants', { params: { userLat, userLng } })
            .then((response) => {
              return response.data;
            });
  };
}
