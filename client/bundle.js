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

	__webpack_require__(1);
	__webpack_require__(3);
	__webpack_require__(4);

	myApp.directive('navBar', function() {
	  return {
	      restrict: 'AE',
	      replace: 'true',
	      templateURL: './source/views/navBar.html'
	  };
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(2);
	////git push salty
	myApp.controller('myCtrl', function($scope, dummyService) {

	  const scopeProps={
	  check: 'Angular is registered',
	  flagCompany: false,
	  flagAddress: false,
	  flagName: false,
	  contactMessage: "Interested in learning more?"
	};

	 Object.assign($scope, scopeProps)


	  // $scope.$watch('address', (newValue, oldValue, scope)=> {
	  //   if (oldValue) {

	  //     if (oldValue.length === 4 && !$scope.flagAddress) {
	  //      dummyService.watchAction($scope,"flagAddress","emailName");
	  //     }
	  //   }
	  // });

	  $scope.$watch('name', (newValue, oldValue, scope)=> {
	    if (oldValue) {
	      if (oldValue.length === 3 && !$scope.flagName) {
	        dummyService.watchAction($scope,"flagName","emailCompany");
	      }
	    }
	  });

	  $scope.$watch('company', (newValue, oldValue, scope)=> {
	    if (oldValue) {
	      if (oldValue.length === 3 && !$scope.flagCompany) {
	        dummyService.watchAction($scope, "flagCompany", "comment");
	        document.getElementById("action").disabled = false;

	      }
	    }
	  });

	$scope.$watchGroup(['address', 'name', 'company'], function(newValues, oldValues, scope) {

	  [address,name,company]=[oldValues[0],oldValues[1],oldValues[2]];
	  console.log(address, name, company);

	  if (address.length === 4 && !$scope.flagAddress) {
	    dummyService.watchAction($scope,"flagAddress","emailName");
	  }

	});


	  dummyService.emailAction($scope, false, null, []);
	  $scope.sendEmailAddress = (address, name, company, comment) => {

	    console.log("$scope.comment", comment);

	    if (!utils.reg.test(address)){
	      dummyService.emailAction($scope, false, "<h3>Please enter a valid Email Address.</h3>", []);
	    } else if (!name.length) {
	      dummyService.emailAction($scope, false, "<h3>Please enter a valid name.</h3>", []);
	    } else if (!company.length){
	      dummyService.emailAction($scope, false, "<h3>Please enter a valid company name</h3>", []);
	    } else {

	    socket.emit('sendEmailAddress', {
	      address,
	      name,
	      company,
	      comment,
	    });

	    dummyService.emailAction($scope, true, null, []);

	    socket.once('loggedToDB', msg => {
	      console.log("this is msg", msg);
	      const addOn = msg.companyInfo ? `\nIt looks like ${msg.companyInfo[1]} from ${msg.companyInfo[0]} has also registered interest!` : "";
	      dummyService.emailAction($scope, false, `<h3>Email has been added- Thanks!${addOn}</h3>`, msg.storyInfo, true);
	      [$scope.name, $scope.company, $scope.contactMessage] = ["", "", "Wanna Send Again?"];
	      $("#comment").val("");
	      $("#contactMessage").css({left: "13%", position: "relative"});
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
	    if (moveIt!==undefined){
	      clearInterval(moveIt);
	    }
	   

	    $rootScope.currRoute = map[path];
	    console.log(path)
	  });
	});






/***/ },
/* 2 */
/***/ function(module, exports) {

	
	var toDateTime= function(secs) {
		var t = new Date(1970, 0, 1); // Epoch
		t.setSeconds(secs);
		return t;
	}

	var reg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i


	module.exports={
		toDateTime:toDateTime,
		reg:reg
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	myApp.service('dummyService', function(){
		
	  this.emailAction= (scope, loading , error, stories, clear)=>{
	    [scope.loading, scope.error, scope.stories]=[loading, error, stories];

		if (clear){    	
			$("#emailAddress,#emailName,#emailCompany").val("");
		 }
	  }

	  this.watchAction = (scope, watchVar, elem)=>{
	     $("#action").css({opacity:1});
	        scope[watchVar] = true;

	        let el = $(`#${elem}`),
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

	})

/***/ },
/* 4 */
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