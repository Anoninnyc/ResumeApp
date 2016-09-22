myApp.config(function($routeProvider, $locationProvider) {
  $routeProvider.
  when('/', {
    templateUrl: '/source/views/home.html',
    controller: 'myCtrl'
  }).
  when('/resume', {
    templateUrl: '/source/views/start.html',
    controller: 'myCtrl'
  }).
  when('/techUsed', {
    templateUrl: '/source/views/techUsed.html',
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