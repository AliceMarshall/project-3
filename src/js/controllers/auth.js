angular
  .module('dateApp')
  .controller('RegisterCtrl', RegisterCtrl)
  .controller('LoginCtrl', LoginCtrl);

RegisterCtrl.$inject = ['$auth', '$state'];
function RegisterCtrl($auth, $state) {
  const vm = this;
  vm.user = {};

  function submit() {
    if (vm.registerForm.$valid) {
      $auth.signup(vm.user)
        .then(() => $state.go('login'));
    }
  }

  vm.submit = submit;
}

LoginCtrl.$inject = ['$auth', '$state'];
function LoginCtrl($auth, $state) {
  const vm = this;
  vm.credentials = {};

  function submit() {
    if (vm.loginForm.$valid) {
      $auth.login(vm.credentials)
        .then(() => {
          const currentUserId = $auth.getPayload().userId;
          console.log('userId', currentUserId);
          $state.go('usersShow', { id: currentUserId });
        });
    }
  }

  vm.submit = submit;
}
