angular
  .module('dateApp')
  .controller('FilmsCtrl', FilmsCtrl);

FilmsCtrl.$inject = ['films'];
function FilmsCtrl(films) {
  const vm = this;
  vm.info = [];
  console.log(vm.info);


  filmsIndex();

  function filmsIndex() {
    films.filmsIndex()
    .then((filmapiInfo) => {
      console.log(filmapiInfo);
      vm.info = filmapiInfo;
    });
  }
}
