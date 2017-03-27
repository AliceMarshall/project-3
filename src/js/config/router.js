angular
  .module('dateApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {//homepage - with logo
      url: '/',
      templateUrl: 'js/index.html',
      controller: 'MainCtrl as main'
    })
    .state('dateNightsIndex', {//index page for all dates created by all users
      url: '/dateNights/index',
      templateUrl: 'js/views/dateNights/index.html',
      controller: 'dateNightsIndexCtrl as dateNightsIndex'
    })
    .state('dateNightsNew', {//new date form page
      url: '/dateNights/new',
      templateUrl: 'js/views/dateNights/new.html',
      controller: 'dateNightsNewCtrl as dateNightsNew'
    })

    .state('dateNightsEdit', {//google maps page
      url: '/dateNights/:id/edit',
      templateUrl: 'js/views/dateNights/edit.html',
      controller: 'dateNightsEditCtrl as dateNightsEdit'
    })

    .state('dateNightsShow', {//shows details of the date record
      url: '/dateNights/:id',
      templateUrl: 'js/views/dateNights/show.html',
      controller: 'dateNightsShowCtrl as dateNightsShow'
    })

    .state('cinemas', {//shows details of the date record
      url: '/googleMap',
      templateUrl: 'js/views/googleMap.html',
      controller: 'CinemaCtrl as cinemas'
    })

    .state('usersIndex', {//index of all date created by that user.
      url: '/user/:id',
      templateUrl: 'js/views/users/index.html',
      controller: 'usersIndexCtrl as usersIndex'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'js/views/auth/login.html',
      controller: 'LoginCtrl as login'
    })

    .state('register', {
      url: '/register',
      templateUrl: 'js/views/auth/register.html',
      controller: 'RegisterCtrl as register'
    });



  $urlRouterProvider.otherwise('/login');
}
