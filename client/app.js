var myApp = angular.module('myApp', ['ngRoute'])


myApp.controller('myCtrl', function($scope) {
  $scope.repeatables = ["Send something, please!"];
  $scope.check = 'Angular is registered';

  $scope.sendEmailAddress = function(emailAddress) {

    socket.emit('sendEmailAddress', emailAddress);

    socket.once('loggedToDB', function(msg) {

      $scope.$apply(function() {
        $scope.repeatables = ["Email has been Added", "congrats!"];
      })
    })

    socket.once('emailExtant', function(msg) {
      $scope.$apply(function() {
        $scope.repeatables = ["Not Added", "This email is already in our DB"];
      })
    });

    socket.once('invalidEmail', function(msg) {
      $scope.$apply(function() {
        $scope.repeatables = ["Please enter a valid Email Address", "Do it now!"];
      })
    });

  };

})


myApp.config(function($routeProvider, $locationProvider) {
  $routeProvider.
  when('/', {
    templateUrl: '/source/views/start.html',
    controller: 'myCtrl'
  }).
  when('/bSB', {
    templateUrl: '/source/views/bookstrapButton.html',
    controller: 'myCtrl'
  })

  $locationProvider.html5Mode(true);
})
