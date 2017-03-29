angular
  .module('dateApp')
  .controller('RestaurantCtrl', RestaurantCtrl);

RestaurantCtrl.$inject = ['restaurants', 'User', '$auth'];
function RestaurantCtrl(restaurants, User, $auth) {
  const vm = this;
  vm.all = [];

  const userId = $auth.getPayload().userId;

  User.get({ id: userId }, (user) => {
    vm.user = user;
    getRestaurant();
  });

  function getRestaurant() {
    restaurants.getRestaurants(vm.user.geometry.lat, vm.user.geometry.lng)
    .then((data)=>{
      console.log('data', data);
      return vm.all = data;
    });
  }
}
