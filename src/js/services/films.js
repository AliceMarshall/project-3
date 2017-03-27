angular
  .module('dateApp')
  .service('films', Films);

Films.$inject = ['$http'];
function Films($http) {
  this.filmsIndex = function filmsIndex() {
    return $http
            .get('/api/films')
            .then((response) => {
              console.log(response);
              const filmapiInfo = {};
              filmapiInfo.cinemaName = response.data.cinemas[0].name;
              filmapiInfo.cinemaId = response.data.cinemas[0].id;
              console.log(filmapiInfo.cinemaId);
              return filmapiInfo;
            });

  };
}
