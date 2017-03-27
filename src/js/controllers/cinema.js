angular
  .module('dateNightApp')
  .controller('DateNightIndexCtrl', DateNightIndexCtrl);

DateNightIndexCtrl.$inject = ['cinemas'];
function DateNightIndexCtrl(cinemas) {
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
