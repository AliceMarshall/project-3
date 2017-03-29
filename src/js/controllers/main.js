angular
  .module('dateApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth', 'User'];
function MainCtrl($rootScope, $state, $auth, User) {
  const vm = this;
  vm.isNavCollapsed = true;
  vm.menuIsOpen = false;

  vm.isAuthenticated = $auth.isAuthenticated;

  $rootScope.$on('error', (e, err) => {
    vm.stateHasChanged = false;
    vm.message = err.data.message;
    $state.go('login');
  });

  $rootScope.$on('$stateChangeSuccess', () => {
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    vm.isNavCollapsed = true;
    //checks if there's a token
    if($auth.getPayload()) {
      vm.currentUserId = $auth.getPayload().userId;
      vm.currentUser = User.get({ id: vm.currentUserId });
    }
  });

  $rootScope.$on('$stateChangeStart', stateChange);
  function stateChange(e, toState) {
    vm.pageName = toState.name;
    vm.menuIsOpen = false;
  }

  $rootScope.$on('loggedIn', (e, user) => {
    vm.currentUser = user;
  });

  function logout() {
    vm.currentUser = null;
    $auth.logout();
    $state.go('login');
  }

  vm.logout = logout;
}
