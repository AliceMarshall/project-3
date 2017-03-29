angular
  .module('dateApp')
  .service('cinemas', Cinemas);

Cinemas.$inject = ['$http'];
function Cinemas($http) {
  this.getCinemas = function getCinemas(userLat, userLng, dateLat, dateLng) {
    return $http
            .get('/api/cinemas', { params: { userLat, userLng, dateLat, dateLng } })
            .then((response) => {
              console.log(response.data);
              return response.data;
            });
  };
}
