


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

	it('Should succesfully log a new email address',function(done){
		//this.timeout(1000);
		const salty = [Math.random()].concat([Math.random()]).join("");
		$scope.sendEmailAddress(salty+'@gmail.com',salty,salty);
		setTimeout(()=>{expect($scope.error).to.equal('<h3>Email has been added, Congrats!</h3>'); done() },500);
	})

	it('Should throw an error when attempting to log an extant address',function(done){
		const salty = [Math.random()].concat([Math.random()]).join("");
		$scope.sendEmailAddress('bob@gmail.com',salty,salty);
		setTimeout(()=>{expect($scope.error).to.equal('<h3>It looks like you\'ve already sent your info</h3>'); done()},500);
	})

	it('Should throw an error when attempting to log an extant name',function(done){

		const salty = [Math.random()].concat([Math.random()]).join("");
		$scope.sendEmailAddress(salty+'@gmail.com',"bob",salty);
		setTimeout(()=>{expect($scope.error).to.equal('<h3>It looks like you\'ve already sent your info</h3>'); done()},500);
		
	});

	it('Should acknowledge if colleagues have sent email addresses',function(done){

		const salty = [Math.random()].concat([Math.random()]).join("");
		$scope.sendEmailAddress(salty+'@gmail.com',salty,"google");
		setTimeout(()=>{expect($scope.error.split(" ").indexOf("google")).to.be.above(-1); done()},500);
		
	});

})



describe('should test clicking on the nav buttons', function() {

});





describe('successfull entry into database', function() {


});