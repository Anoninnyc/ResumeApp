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

	myApp.controller('myCtrl', function($scope,dummyService) {
	  $scope.repeatables = ["Send something, please!"];
	  $scope.check = 'Angular is registered';


	  $scope.$watch('address', function (newValue, oldValue, scope) {
	    console.log(newValue, oldValue, scope);
	  }, true);


	  dummyService.emailAction($scope, false, null, []);

	  $scope.sendEmailAddress = (address, name, company)=> {
	      socket.emit('sendEmailAddress', {address, name, company});
	      dummyService.emailAction($scope, true, null, []);

	    socket.once('loggedToDB', msg=> {
	      console.log('reccccc')
	        const addOn= msg.companyInfo? ` It looks like ${msg.companyInfo[1]} from ${msg.companyInfo[0]} has also registered interest!`: "";
	        dummyService.emailAction($scope, false, `<h3>Email has been added, Congrats!${addOn}</h3>`, msg.storyInfo, true);
	         $scope.$apply();
	    })

	    socket.once('emailExtant', msg=> {
	        dummyService.emailAction($scope, false, "<h3>It looks like you've already sent your info</h3>", []);
	        $scope.$apply();
	    });

	    socket.once('invalidEmail', msg=> {
	        dummyService.emailAction($scope, false, "<h3>Please enter a valid Email Address.</h3>", []);
	        $scope.$apply();
	    });


	    socket.once('invalidName', msg=> {
	        dummyService.emailAction($scope, false, "<h3>Please enter a valid Email Address.</h3>", []);
	        $scope.$apply();
	    });

	     socket.once('invalidCompany', msg=> {
	         dummyService.emailAction($scope, false, "<h3>Please enter a valid company name</h3>", []);
	        $scope.$apply();
	    });

	  };

	})


/***/ },
/* 2 */
/***/ function(module, exports) {

	myApp.service('dummyService', function(){
	  this.emailAction= (scope, loading , error, stories, clear)=>{
	    [scope.loading, scope.error, scope.stories]=[loading, error, stories];
	    if (clear){
	    	console.log(clear)
	    	
	    	$("#emailAddress").val("");
	    	$("#emailName,#emailCompany").css({display:"none"});
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

/***/ }
/******/ ]);