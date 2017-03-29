angular
  .module('dateApp')
  .controller('ShowtimesCtrl', ShowtimesCtrl);

ShowtimesCtrl.$inject = ['showtimes'];
function ShowtimesCtrl(showtimes) {
  const vm = this;
  vm.info = [];

  function moviesIndex() {
    showtimes.moviesIndex()
    .then((moviesListing) => {
      vm.movies = moviesListing;
      // console.log(vm.movies.movietimes[0].title);
      // console.log(vm.movies.movietimes[0].times);
      return vm.movies;

    });
  }
  moviesIndex();
}
