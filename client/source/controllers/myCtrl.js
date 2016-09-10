myApp.controller('myCtrl', function($scope) {
  $scope.check = 'Angular is registered';
  $scope.sendEmailAddress = function(emailAddress) {
    console.log('clicked', emailAddress);
    socket.emit('sendEmailAddress', emailAddress);
    socket.on('loggedToDB', function(msg) {
      console.log(msg);
    });
  }
});
