describe('TheResumeApp', function() {
  describe('Send Info', function() {

    beforeEach(function() {
      module('myApp');
    });

    beforeEach(inject(function($rootScope, $controller) {
      $scope = $rootScope.$new();
      createController = function() {
        return $controller('myCtrl', {
          $scope: $scope
        });
      };
      createController();
    }))




    it('Should have sendEmailAddress method', function() {
      expect($scope.sendEmailAddress).to.be.a('function');
    });

    it('Should throw errors when invalid contact info is provided', function() {
      $scope.sendEmailAddress('notValidEmail', 'test', 'test');
      expect($scope.error).to.equal("<h3>Please enter a valid Email Address.</h3>");
      $scope.sendEmailAddress('notValidEmail@gmail.com', '', 'test');
      expect($scope.error).to.equal("<h3>Please enter a valid name.</h3>");
      $scope.sendEmailAddress('notValidCompany@gmail.com', 'test', '');
      expect($scope.error).to.equal("<h3>Please enter a valid company name</h3>");
    })

    it('Should succesfully log a new email address', function(done) {
      this.timeout(2000)
      const salty = [Math.random()].concat([Math.random()]).join("");
      $scope.sendEmailAddress(salty + '@gmail.com', salty, salty);
      socket.once("loggedToDB", function(a, b) {
        expect($scope.error).to.equal('<h3>Email has been added- Thanks!</h3>');
        done();
      })

    })

    it('Should throw an error when attempting to log an extant address', function(done) {
      this.timeout(1000);
      const salty = [Math.random()].concat([Math.random()]).join("");
      $scope.sendEmailAddress('bob@gmail.com', salty, salty);
      socket.once('emailExtant', function() {
        expect($scope.error).to.equal('<h3>It looks like you\'ve already sent your info</h3>');
        done();
      })
    })

      it('Should throw an error when attempting to log an extant address', function(done) {
    	this.timeout(1000);
    	const salty = [Math.random()].concat([Math.random()]).join("");
		$scope.sendEmailAddress(salty+'@gmail.com',"bob",salty);
		socket.once('emailExtant', function() {
          expect($scope.error).to.equal('<h3>It looks like you\'ve already sent your info</h3>');
          done();
        })
      })

       it('Should acknowledge if colleagues have sent email addresses',function(done){

		const salty = [Math.random()].concat([Math.random()]).join("");
		$scope.sendEmailAddress(salty+'@gmail.com',salty,"google");
		socket.once('loggedToDB', function() {
          expect($scope.error.split(" ").indexOf("google")).to.be.above(-1)
          done();
        })		
	   });
	   
   })
})
