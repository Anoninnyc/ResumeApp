

var myApp= angular.module('myApp', ['ngRoute'])


// myApp.service('consolelogRN',function(){

//   this.gen=fucntion(){
//     return Math.round(Math.random()*10);
//   }

// })


myApp.controller('myCtrl',function($scope){

	$scope.check='Angular is registered';
  $scope.sendEmailAddress=function(){
    console.log('clicked',socket.id);
    socket.emit('sendEmailAddress','Recieving this means sockets are working');
  }
});






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