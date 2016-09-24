myApp.config(function($routeProvider, $locationProvider) {
  $routeProvider.
  when('/', {
    templateUrl: '/source/views/home.html',
    controller: 'myCtrl'
  }).
  when('/resume', {
    templateUrl: '/source/views/resume.html',
    controller: 'myCtrl'
  }).
  when('/techUsed', {
    templateUrl: '/source/views/techUsed.html',
    controller: 'myCtrl'
  }).
  when('/contact', {
    templateUrl: '/source/views/contact.html',
    controller: 'myCtrl'
  }).
  otherwise({
    redirectTo:"/"
    })

  $locationProvider.html5Mode(true);
})