describe('myCtrl Controller', function() {
  describe('#indexOf()', function(){




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
	   $scope.sendEmailAddress('notValidCompany@gmail.com','test','');
	   expect($scope.error).to.equal("<h3>Please enter a valid company name</h3>");
	})

	it('Should succesfully log a new email address',function(done){
		this.timeout(10000);
		const salty = [Math.random()].concat([Math.random()]).join("");
		$scope.sendEmailAddress(salty+'@gmail.com',salty,salty);
		//setTimeout(function(){
			expect($scope.error).to.equal('<h3>Email has been added- Thanks!</h3>');
			// done() 

			//},5500);
	})

})
})

