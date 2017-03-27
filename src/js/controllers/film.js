angular
  .module('dateApp')
  .controller('FilmsCtrl', FilmsCtrl);

FilmsCtrl.$inject = ['films'];
function FilmsCtrl(films) {
  const vm = this;
  vm.all = [];


  filmsIndex();

  function filmsIndex() {
    films.filmsIndex()
    .then((response) => {
      vm.all = response.data;
    
    });
  }
}
