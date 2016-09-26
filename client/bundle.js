/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	myApp = angular.module('myApp', ['ngRoute', 'ngSanitize'])


	// Directives

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);

	myApp.directive('navBar', function() {
	  return {
	      restrict: 'AE',
	      replace: 'true',
	      templateURL: './source/views/navBar.html'
	  };
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	myApp.controller('myCtrl', function($scope, dummyService) {
	  $scope.repeatables = ["Send something, please!"];
	  $scope.check = 'Angular is registered';
	  $scope.flagAddress = false;
	  $scope.flagName = false;
	  $scope.contactMessage = "Interested in learning more?"
	  

	  $scope.$watch('address', function(newValue, oldValue, scope) {
	    if (oldValue) {
	      if (oldValue.length === 4 && !$scope.flagAddress) {
	        $scope.flagAddress = true;

	        let el = $('#emailName'),
	        curHeight = el.height(),
	        autoHeight = el.css('height', 'auto').height();

	        el.height(curHeight).css({
	          padding: 0,
	          display: "inline"
	        }).animate({
	          height: autoHeight,
	          padding: 14
	        }, 100);

	      }
	    }
	  });

	  $scope.$watch('name', function(newValue, oldValue, scope) {
	    if (oldValue) {
	      if (oldValue.length === 3 && !$scope.flagName) {
	        $scope.flagName = true;

	        let el2 = $('#emailCompany'),
	          curHeight = el2.height(),
	          autoHeight = el2.css('height', 'auto').height();
	        el2.height(curHeight).css({
	          padding: 0,
	          display: "inline"
	        }).animate({
	          height: autoHeight,
	          padding: 14
	        }, 100);
	      }
	    }
	  });


	  $scope.$watch('company', function(newValue, oldValue, scope) {
	    if (oldValue) {
	      if (oldValue.length === 3) {
	      $("#action").css({opacity:1});
	      document.getElementById("#action").disabled = false;
	     }
	    }
	  });

	  const reg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i

	  dummyService.emailAction($scope, false, null, []);
	  $scope.sendEmailAddress = (address, name, company) => {

	    if (!reg.test(address)){
	      dummyService.emailAction($scope, false, "<h3>Please enter a valid Email Address.</h3>", []);
	      //$scope.$apply();
	    } else if (!name.length) {
	      dummyService.emailAction($scope, false, "<h3>Please enter a valid name.</h3>", []);
	      //$scope.$apply();
	    } else if (!company.length){
	      dummyService.emailAction($scope, false, "<h3>Please enter a valid company name</h3>", []);
	     // $scope.$apply();
	    } else {

	    socket.emit('sendEmailAddress', {
	      address,
	      name,
	      company
	    });

	    dummyService.emailAction($scope, true, null, []);

	    socket.once('loggedToDB', msg => {

	      const addOn = msg.companyInfo ? ` It looks like ${msg.companyInfo[1]} from ${msg.companyInfo[0]} has also registered interest!` : "";
	      dummyService.emailAction($scope, false, `<h3>Email has been added, Congrats!${addOn}</h3>`, msg.storyInfo, true);
	      [$scope.name, $scope.company, $scope.contactMessage] = ["", "", "Wanna Send Again?"];
	      $scope.$apply();
	    })

	    socket.once('emailExtant', msg => {
	      dummyService.emailAction($scope, false, "<h3>It looks like you've already sent your info</h3>", []);
	      $scope.$apply();
	    });
	  };


	 }
	})


	myApp.run(function($rootScope) {
	  $rootScope.count = 3;
	   const map = {
	      "/contact": "Contact Page",
	      "/techUsed": "Tech Used",
	      "/resume": "My Resume",
	      "/": "Welcome!"
	    };


	  $rootScope.countdown = function() {
	    console.log("coutingDOWN!!!")
	    if ($rootScope.count > 1) {
	      $rootScope.count--;
	    } else if ($rootScope.count === 1) {
	      $rootScope.count = "GO!";
	    } else {
	      $rootScope.count = null;
	    }

	  };

	   $rootScope.$on("$routeChangeStart", (e, current)=>{
	    console.log(e,current.$$route.originalPath);
	    $rootScope.currRoute=map[current.$$route.originalPath];
	   })


	  $rootScope.$on('$routeChangeSuccess', (e, current) => {
	    let path = current.$$route.originalPath;
	    if (path === "/techUsed" && $rootScope.counting!==1) {
	      $rootScope.count = 3;
	      $rootScope.counting=1;

	      for (var i = 500; i < 2001; i += 500) {
	        (function(i) {
	          setTimeout(function() {
	            $rootScope.countdown();
	            $rootScope.$apply();
	            if (i===2000){
	            $rootScope.counting=2;
	            $(".tech").css({display:"inline"})
	            $rootScope.$apply();
	            }
	          }, i)
	        }(i));
	      }
	    }

	    moveIt !== undefined ? clearInterval(moveIt) : null;
	   

	    $rootScope.currRoute = map[path];
	    console.log(path)
	  });
	});





/***/ },
/* 2 */
/***/ function(module, exports) {

	myApp.service('dummyService', function(){
	  this.emailAction= (scope, loading , error, stories, clear)=>{
	    [scope.loading, scope.error, scope.stories]=[loading, error, stories];

	    if (clear){
	    	console.log(clear)
	    	
	    	$("#emailAddress,#emailName,#emailCompany").val("");
	    	//$("#action").css({opacity:1});
	     }
	  }
	})

/***/ },
/* 3 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);