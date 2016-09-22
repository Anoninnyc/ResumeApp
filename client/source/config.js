myApp.config(function($routeProvider, $locationProvider) {
  $routeProvider.
  when('/', {
    templateUrl: '/source/views/start.html',
    controller: 'myCtrl'
  }).
  when('/interested', {
    templateUrl: '/source/views/bookstrapButton.html',
    controller: 'myCtrl'
  }).
  otherwise({
    redirectTo:"/"
    })

  $locationProvider.html5Mode(true);
})