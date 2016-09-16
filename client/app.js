var myApp = angular.module('myApp', ['ngRoute', 'ngSanitize'])


myApp.controller('myCtrl', function($scope) {
  $scope.repeatables = ["Send something, please!"];
  $scope.check = 'Angular is registered';
  $scope.stories = [];
  $scope.error=null;
  $scope.loading=false;

  $scope.sendEmailAddress = (address, name, company)=> {

    socket.emit('sendEmailAddress', {address, name, company});
 
   
      $scope.loading=true;
      $scope.error=null;
    

    socket.once('loggedToDB', msg=> {
        const info=msg.companyInfo;
        const addOn= info? ` It looks like ${info[1]} from ${info[0]} has also registered interest!`: "";

        $scope.loading=false;
        $scope.stories=msg.storyInfo
        $scope.error=`<h3>Email has been added, Congrats!${addOn}</h3>`
        $scope.$apply();
    })

    socket.once('emailExtant', msg=> {
      
        $scope.loading=false;
        $scope.error= "It looks like you've already send your info"
        $scope.stories = [];
        $scope.$apply();
    });

    socket.once('invalidEmail', msg=> {
    
        $scope.loading=false;
        $scope.error= "<h3>Please enter a valid Email Address.</h3>"
        $scope.$apply();
    });


    socket.once('invalidName', msg=> {
    
        $scope.loading=false;
        $scope.error= "<h3>Please enter a valid name</h3>"
        $scope.$apply();
    });

     socket.once('invalidCompany', msg=> {
    
        $scope.loading=false;
        $scope.error= "<h3>Please enter a valid company name</h3>"
        $scope.$apply();
    });

  };

})


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


