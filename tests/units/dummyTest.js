


//var module= angular.module;

describe('myCtrl Controller', function() {

	beforeEach(function(){
	  module('myApp');
	});


	beforeEach(inject(function ($rootScope, $controller) {
	  
  	  $scope=$rootScope.$new();
  	  
  	  createController = function () {
      return $controller('myCtrl', {
        $scope: $scope
        });
  	   };

  	   createController();

  	  }))
	
	it('Should have sendEmailAddress method', function() {
	  expect($scope.sendEmailAddress).to.be.a('function');
	 
	});

	it('Should throw errors when invalid contact info is provided',function(){
	   $scope.sendEmailAddress('notValidEmail','test','test');
	   expect($scope.error).to.equal("<h3>Please enter a valid Email Address.</h3>");
	   $scope.sendEmailAddress('notValidEmail@gmail.com','','test');
	   expect($scope.error).to.equal("<h3>Please enter a valid name.</h3>");
	   $scope.sendEmailAddress('notValidEmail@gmail.com','test','');
	   expect($scope.error).to.equal("<h3>Please enter a valid company name</h3>");
	})

	it('Successfully send socket message',function(){
		$scope.sendEmailAddress('validEmail@gmail.com','test','test');
		console.log($scope);
	})


})

