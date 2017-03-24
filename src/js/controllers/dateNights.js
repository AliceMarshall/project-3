angular
  .module('dateApp')
  .controller('dateNightsIndexCtrl', dateNightsIndexCtrl)
  .controller('dateNightsNewCtrl', dateNightsNewCtrl)
  .controller('dateNightsShowCtrl', dateNightsShowCtrl)
  .controller('dateNightsEditCtrl', dateNightsEditCtrl);

dateNightsIndexCtrl.$inject = ['DateNight'];
function dateNightsIndexCtrl(DateNight) {
  const vm = this;

  vm.all = DateNight.query();
}

dateNightsNewCtrl.$inject = ['DateNight', '$state'];
function dateNightsNewCtrl(DateNight, $state) {
  const vm = this;
  vm.dateNight = {};

  function dateNightsCreate() {
    if(vm.newForm.$valid) {
      DateNight
        .save(vm.dateNight)
        .$promise
        .then(() => $state.go('dateNightsIndex'));
    }
  }

  vm.create = dateNightsCreate;
}

dateNightsShowCtrl.$inject = ['DateNight', 'DateNightComment', '$stateParams', '$state'];
function dateNightsShowCtrl(DateNight, DateNightComment, $stateParams, $state) {
  const vm = this;
  vm.newComment = {};
  vm.dateNight = DateNight.get($stateParams);

  function dateNightsDelete() {
    vm.dateNight
      .$remove()
      .then(() => $state.go('dateNightsIndex'));
  }

  vm.delete = dateNightsDelete;

  function addComment() {
    DateNightComment
      .save({ dateNightId: vm.dateNight.id}, vm.newComment)
      .$promise
      .then((comment) => {
        vm.dateNight.comments.push(comment);
        vm.newComment = {};
      });
  }
  vm.addComment = addComment;

  function deleteComment(comment) {
    DateNightComment
      .delete({ dateNightId: vm.dateNight.id, id: comment.id })
      .$promise
      .then(() => {
        const index = vm.dateNight.comments.indexOf(comment);
        vm.dateNight.comments.splice(index, 1);
      });
  }

  vm.deleteComment = deleteComment;
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
