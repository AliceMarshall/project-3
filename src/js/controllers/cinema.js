angular
  .module('dateApp')
  .controller('CinemaCtrl', CinemaCtrl);

CinemaCtrl.$inject = ['cinemas'];
function CinemaCtrl(cinemas) {
  const vm = this;
  vm.all = [];

  getCinema();

  function getCinema() {
    cinemas.getCinemas()
    .then((data)=>{
      // console.log('data', data);
      return vm.all = data;
    });
  }
}
