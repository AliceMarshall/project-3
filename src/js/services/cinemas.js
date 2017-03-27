angular
  .module('dateApp')
  .service('cinemas', Cinemas);

Cinemas.$inject = ['$http'];
function Cinemas($http) {
  this.getCinemas = function getCinemas(location) {
    return $http
            .get('/api/cinemas', { params: { location } })
            .then((response) => {
              return response.data;
            });
  };
}
