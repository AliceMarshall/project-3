angular
  .module('dateApp')
  .controller('CinemaCtrl', CinemaCtrl);

CinemaCtrl.$inject = ['cinemas'];
function CinemaCtrl(cinemas) {
  const vm = this;
  vm.all = [];

  getCinema();

  function getCinema() {
    cinemas.getCinemas('51.544235,-0.051672')
    .then((data)=>{
      console.log(data.results);
      return vm.all = data.results;
    });
  }
}
