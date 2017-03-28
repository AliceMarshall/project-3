angular
  .module('dateApp')
  .controller('CinemaCtrl', CinemaCtrl);

CinemaCtrl.$inject = ['cinemas', 'User', 'DateNight', '$stateParams', '$auth'];
function CinemaCtrl(cinemas, User, DateNight, $stateParams, $auth) {
  const vm = this;
  vm.all = [];

  const userId = $auth.getPayload().userId;

  User.get({ id: userId }, (user) => {
    vm.user = user;

    DateNight.get($stateParams, (date) => {
      // console.log('the user', vm.user.geometry);
      // console.log('the date', date);
      vm.date = date;
      getCinema();
    });
  });

  function getCinema() {
    cinemas.getCinemas(vm.user.geometry.lat, vm.user.geometry.lng, vm.date.geometry.lat, vm.date.geometry.lng)
    .then((data)=>{
      // console.log('data', data);
      return vm.all = data;
    });
  }
}
