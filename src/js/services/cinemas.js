angular
  .module('dateApp')
  .service('cinemas', Cinemas);

Cinemas.$inject = ['$http'];
function Cinemas($http) {
  this.getCinemas = function getCinemas(lat, lng) {
    return $http
            .get('/api/cinemas', { params: { lat, lng } })
            .then((response) => {
              console.log(response.data);
              return response.data;
            });
  };
}
