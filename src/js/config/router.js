angular
  .module('dateApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {//homepage - with logo
      url: '/',
      templateUrl: 'js/views/index.html',
      controller: 'mainCtrl as main'
    })
    .state('datesIndex', {//index page for all dates created by all users
      url: '/dates/Index',
      templateUrl: 'js/views/dates/new.html',
      controller: 'datesIndexCtrl as datesIndex'
    })
    .state('datesNew', {//new date form page
      url: '/dates/new',
      templateUrl: 'js/views/dates/new.html',
      controller: 'datesNewCtrl as datesNew'
    })

    .state('datesEdit', {//google maps page
      url: '/dates/:id/edit',
      templateUrl: 'js/views/dates/edit.html',
      controller: 'datesEditCtrl as datesEdit'
    })

    .state('datesShow', {//shows details of the date record
      url: '/dates/:id',
      templateUrl: 'js/views/dates/show.html',
      controller: 'datesShowCtrl as datesShow'
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
