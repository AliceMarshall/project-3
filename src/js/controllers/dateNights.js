angular
  .module('dateApp')
  .controller('DateNightsIndexCtrl', DateNightsIndexCtrl)
  .controller('DateNightsNewCtrl', DateNightsNewCtrl)
  .controller('DateNightsShowCtrl', DateNightsShowCtrl)
  .controller('DateNightsEditCtrl', DateNightsEditCtrl)
  .controller('DateNightsDeleteCtrl', DateNightsDeleteCtrl);

DateNightsIndexCtrl.$inject = ['DateNight'];
function DateNightsIndexCtrl(DateNight) {
  const vm = this;

  vm.all = DateNight.query();
}

DateNightsNewCtrl.$inject = ['DateNight', '$state'];
function DateNightsNewCtrl(DateNight, $state) {
  const vm = this;
  vm.dateNight = {};

  function dateNightsCreate() {

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

DateNightsShowCtrl.$inject = ['DateNight', '$stateParams', '$state', '$uibModal'];

function DateNightsShowCtrl(DateNight, $stateParams, $state, $uibModal) {
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

DateNightsEditCtrl.$inject = ['DateNight', '$stateParams', '$state'];
function DateNightsEditCtrl(DateNight, $stateParams, $state) {
  const vm = this;

  vm.dateNight = DateNight.get($stateParams);

  function dateNightsUpdate() {
    vm.dateNight
      .$update()
      .then(() => $state.go('dateNightsShow', $stateParams));
  }

  vm.update = dateNightsUpdate;
}

DateNightsDeleteCtrl.inject = ['$uibModalInstance', 'currentDateNight', '$state'];//instance of the modal thats just been opened. The currentBird is the item from resolve
function DateNightsDeleteCtrl($uibModalInstance, currentDateNight, $state) {
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
