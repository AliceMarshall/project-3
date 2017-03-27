angular
  .module('dateNightApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('cinemaIndex', {
      url: '/',
      templateUrl: 'src/index.html'
    });

  $urlRouterProvider.otherwise('/');
}
