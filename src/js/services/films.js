angular
  .module('dateApp')
  .service('films', Films);

Films.$inject = ['$http'];
function Films($http) {
  this.filmsIndex = function filmsIndex() {
    return $http
            .get('/api/films')
            .then((response) => {
              console.log(response.data);
              return response.data;
            });

  };
}
