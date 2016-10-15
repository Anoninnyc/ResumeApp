
it('Should have sendEmailAddress method', function() {
  expect($scope.sendEmailAddress).toBeDefined();
});


it('Should throw errors when invalid contact info is provided',function(){
	 expect($scope.sendEmailAddress).toBeDefined();
   $scope.sendEmailAddress('notValidEmail','test','test');
   expect($scope.error).toEqual("<h3>Please enter a valid Email Address.</h3>");
   $scope.sendEmailAddress('notValidEmail@gmail.com','','test');
   expect($scope.error).toEqual("<h3>Please enter a valid name.</h3>");
   $scope.sendEmailAddress('notValidEmail@gmail.com','test','');
   expect($scope.error).toEqual("<h3>Please enter a valid company name</h3>");
})
