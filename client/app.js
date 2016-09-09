

var myApp= angular.module('myApp', ['ngRoute'])


// myApp.service('consolelogRN',function(){

//   this.gen=fucntion(){
//     return Math.round(Math.random()*10);
//   }

// })



myApp.controller('myCtrl',function($scope){

	$scope.check='Angular is registered';
  $scope.sendEmailAddress=function(emailAddress){
    console.log('clicked',emailAddress);
    socket.emit('sendEmailAddress',emailAddress);
     socket.on('loggedToDB', function(msg){
        console.log(msg);
      });

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