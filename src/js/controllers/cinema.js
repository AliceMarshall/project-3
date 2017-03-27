angular
  .module('dateApp')
  .controller('CinemaCtrl', CinemaCtrl);

CinemaCtrl.$inject = ['cinemas', 'User', '$stateParams'];
function CinemaCtrl(cinemas, User, $stateParams) {
  const vm = this;
  vm.all = [];

  User.query($stateParams, (user) => {
    vm.user = user;
    console.log('the user', vm.user[0].geometry);
    getCinema();
  });

  function getCinema() {
    cinemas.getCinemas(vm.user[0].geometry.lat, vm.user[0].geometry.lng)
    .then((data)=>{
      // console.log('data', data);
      return vm.all = data;
    });
  }
}
