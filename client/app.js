var myApp = angular.module('myApp', ['ngRoute', 'ngSanitize'])


myApp.controller('myCtrl', function($scope) {
  $scope.repeatables = ["Send something, please!"];
  $scope.check = 'Angular is registered';
  $scope.stories = [];
  $scope.error=null;
  $scope.loading=false;

  $scope.sendEmailAddress = function(emailAddress) {

    socket.emit('sendEmailAddress', emailAddress);

   
      $scope.loading=true;
      $scope.error=null;
    

    socket.once('loggedToDB', function(msg) {
      console.log(msg)
      $scope.$apply(function() {
        $scope.loading=false;
        $scope.stories=msg;
        $scope.error="Email has been added, Congrats!"
      })
    })

    socket.once('emailExtant', function(msg) {
      $scope.$apply(function() {
        $scope.loading=false;
        $scope.error= "Not Added, This email is already in our DB"
        $scope.stories = [];
      })
    });

    socket.once('invalidEmail', function(msg) {
      $scope.$apply(function() {
        $scope.loading=false;
        $scope.error= "Please enter a valid Email Address. Do it now!"
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

// Directives
myApp.directive('helloWorld', function() {
  return {
    restrict: 'AE',
    replace: true,
    template: '<p style="background-color:{{color}}">Hello World</p>',
    link: function(scope, elem, attrs) {
      //elem ===p above;
      elem.bind('click', function() {
        elem.css('background-color', 'white');
        scope.$apply(function() {
          scope.color = "black";
        });
      });
      elem.bind('mouseover', function() {
        elem.css('cursor', 'pointer');
      });
    }
  };
});