
describe('myCtrl Controller', function() {

 beforeEach(angular.mock.module('myApp'));

	 beforeEach(inject(function ($rootScope, $controller) {
	   $scope=$rootScope.$new();
  	  createController = function () {
      return $controller('myCtrl', {
        $scope: $scope
        });
  	   };
  	   createController();
	})
   )
//
	it('Should throw errors when invalid contact info is provided',()=>{
	   $scope.sendEmailAddress('notValidEmail','test','test');
	   expect($scope.error).toEqual("<h3>Please enter a valid Email Address.</h3>");
	   $scope.sendEmailAddress('notValidEmail@gmail.com','','test');
	   expect($scope.error).toEqual("<h3>Please enter a valid name.</h3>");
	   $scope.sendEmailAddress('notValidEmail@gmail.com','test','');
	   expect($scope.error).toEqual("<h3>Please enter a valid company name</h3>");
	})

})
