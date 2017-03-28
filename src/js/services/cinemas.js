angular
  .module('dateApp')
  .service('cinemas', Cinemas);

Cinemas.$inject = ['$http'];
function Cinemas($http) {
  this.getCinemas = function getCinemas(userLat, userLng) {
    return $http
            .get('/api/cinemas', { params: { userLat, userLng } })
            .then((response) => {
              console.log(response.data);
              return response.data;
            });
  };
}
