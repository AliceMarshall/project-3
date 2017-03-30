angular
  .module('dateApp')
  .controller('RestaurantCtrl', RestaurantCtrl);

RestaurantCtrl.$inject = ['restaurants', 'DateNight', '$stateParams', '$scope'];
function RestaurantCtrl(restaurants, DateNight, $stateParams, $scope) {
  const vm = this;
  vm.all = [];
  vm.date = {};

  DateNight.get($stateParams, (date) => {

    vm.date = date;
    console.log('date', vm.date);
  });

  $scope.$watch(() => vm.date, getRestaurant);

  function getRestaurant() {
    restaurants.getRestaurants(vm.date.cinema.lat, vm.date.cinema.lng)
    .then((data)=>{
      console.log('data', data);
      return vm.all = data;
    });
  }
}
