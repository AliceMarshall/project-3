angular
  .module('dateApp')
  .controller('dateNightsIndexCtrl', dateNightsIndexCtrl)
  .controller('dateNightsNewCtrl', dateNightsNewCtrl)
  .controller('dateNightsShowCtrl', dateNightsShowCtrl)
  .controller('dateNightsEditCtrl', dateNightsEditCtrl)
  .controller('dateNightsDeleteCtrl', dateNightsDeleteCtrl);

dateNightsIndexCtrl.$inject = ['DateNight'];
function dateNightsIndexCtrl(DateNight) {
  const vm = this;

  vm.all = DateNight.query();
}


dateNightsNewCtrl.$inject = ['DateNight', '$state'];
function dateNightsNewCtrl(DateNight, $state) {
  const vm = this;
  vm.DateNight = {};

  function dateNightCreate() {
    DateNight
      .save(vm.dateNight)
      .$promise
      .then(() => $state.go('dateNightsIndex'));
  }

  vm.create = dateNightCreate;
}

dateNightsShowCtrl.$inject = ['DateNight', '$stateParams', '$state', '$uibModal'];

function dateNightsShowCtrl(DateNight, $stateParams, $state, $uibModal) {
  const vm = this;
  vm.dateNight = DateNight.get($stateParams);

  function openModal(){
    $uibModal.open({
      templateUrl: 'js/views/partials/dateNightDelete.html',
      controller: 'dateNightsDeleteCtrl as dateNightsDelete',
      resolve: {
        currentDateNight: () => {
          return vm.dateNight;
        }
      }
    });
  }
  vm.open = openModal;
}

dateNightsEditCtrl.$inject = ['DateNight', '$stateParams', '$state'];
function dateNightsEditCtrl(DateNight, $stateParams, $state) {
  const vm = this;

  vm.dateNight = DateNight.get($stateParams);

  function dateNightsUpdate() {
    vm.dateNight
      .$update()
      .then(() => $state.go('dateNightsShow', $stateParams));
  }

  vm.update = dateNightsUpdate;
}

dateNightsDeleteCtrl.inject = ['$uibModalInstance', 'currentDateNight', '$state'];//instance of the modal thats just been opened. The currentBird is the item from resolve
function dateNightsDeleteCtrl($uibModalInstance, currentDateNight, $state) {
  const vm = this;
  vm.dateNight = currentDateNight;

  function closeModal() {
    $uibModalInstance.close();
  }
  vm.close = closeModal;

  function dateNightsDelete() {
    vm.dateNight
      .$remove()
      .then(() => {
        $state.go('dateNightsIndex');
        $uibModalInstance.close();
      });
  }

  vm.delete = dateNightsDelete;

}
