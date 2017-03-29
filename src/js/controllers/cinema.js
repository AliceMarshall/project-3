angular
  .module('dateApp')
  .controller('CinemaCtrl', CinemaCtrl);

CinemaCtrl.$inject = ['cinemas', 'films', 'showtimes', 'User', 'DateNight', '$stateParams', '$auth', '$scope'];
function CinemaCtrl(cinemas, films, showtimes, User, DateNight, $stateParams, $auth, $scope) {
  const vm = this;
  vm.all = [];
  vm.center = null;
  vm.selected = null;
  vm.info = [];

  const userId = $auth.getPayload().userId;

  User.get({ id: userId }, (user) => {
    vm.user = user;

    DateNight.get($stateParams, (date) => {
      // console.log('the user', vm.user.geometry);
      // console.log('the date', date);
      vm.date = date;
    });
  });

  $scope.$watch(() => vm.center, getCinemas);
  $scope.$watch(() => vm.selected, getCinemaListings);

  function getCinemaListings() {
    console.log(vm.selected);
    // console.log(vm.selected.latitude);
    // console.log(vm.selected.longitude);
    //
    films.filmsIndex(vm.selected.latitude, vm.selected.longitude)
      .then((filmapiInfo) => {
        console.log('vm.info', filmapiInfo);
        vm.info = filmapiInfo;
      })
      .then(() => {
        showtimes.moviesIndex(vm.info.cinemaId);
      })
      .then((moviesListing) => {
        vm.movies = moviesListing;
        return vm.movies;
      });

    // films.filmsIndex(vm.selected.latitude, vm.selected.longitude)
    //   .then((filmapiInfo) => {
    //     console.log('vm.info', filmapiInfo);
    //     vm.info = filmapiInfo;
    //   })
    //   .then(() => {
    //     showtimes.moviesIndex(vm.info.cinemaId)
    //       .then((moviesListing) => {
    //         vm.movies = moviesListing;
    //   })
      // console.log(vm.movies.movietimes[0].title);
      // console.log(vm.movies.movietimes[0].times);
    //   return vm.movies;
    // });

    filmsIndex();
    // moviesIndex();

    // call cinema API
    // vm.info = [];
    // filmsIndex();
    //
    function filmsIndex() {
      films.filmsIndex(vm.selected.latitude, vm.selected.longitude)
      .then((filmapiInfo) => {
        console.log('vm.info', filmapiInfo);
        vm.info = filmapiInfo;
      })
      .then(() => {
        showtimes.moviesIndex(vm.info.cinemaId)
        .then((moviesListing) => {
          vm.movies = moviesListing;
          // console.log(vm.movies.movietimes[0].title);
          // console.log(vm.movies.movietimes[0].times);
          return vm.movies;
        });
      });
    }

    // function moviesIndex() {
    //
    // }
    // }
    // get listings

    // add them to `vm`
    // call $scope.$apply
  }

  function getCinemas() {
    if(vm.center) {
      cinemas.getCinemas(vm.center.lat, vm.center.lng)
      .then((data)=> {
        console.log('data', data);
        return vm.all = data;
      });
    }
  }
}
