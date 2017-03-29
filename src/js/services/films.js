angular
  .module('dateApp')
  .service('films', Films);

Films.$inject = ['$http'];
function Films($http) {
  this.filmsIndex = function filmsIndex(lat, lng) {
    return $http
            .get('/api/films', { params: { lat, lng }})
            .then((response) => {
              console.log('films',response);
              const filmapiInfo = {};
              filmapiInfo.cinemaName = response.data.cinemas[0].name;
              filmapiInfo.cinemaId = response.data.cinemas[0].id;
              console.log(filmapiInfo.cinemaId);
              return filmapiInfo;
            });

  };
}
