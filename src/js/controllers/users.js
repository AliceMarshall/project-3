angular
  .module('dateApp')
  .controller('usersIndexCtrl', usersIndexCtrl)
  .controller('usersEditCtrl', usersEditCtrl);

usersIndexCtrl.$inject = ['User'];
function usersIndexCtrl(User) {
  const vm = this;

  vm.all = User.query();
}

usersEditCtrl.$inject = ['User', '$stateParams', '$state'];
function usersEditCtrl(User, $stateParams, $state) {
  const vm = this;

  vm.user = User.get($stateParams);

  function usersUpdate() {
    vm.user
      .$update()
      .then(() => $state.go('usersShow', $stateParams));
  }

  vm.update = usersUpdate;
}
