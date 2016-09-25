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

	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./source/controllers/mainController.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
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
/* 1 */,
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