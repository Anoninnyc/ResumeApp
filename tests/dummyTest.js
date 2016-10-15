

describe('myCtrl Controller', function() {


beforeEach(function(done) {
        // Setup
         socket = io.connect('https://krishanmarya.herokuapp.com',{
		  transports: ['websocket'],
		  'force new connection': true
		})

        socket.on('connect', function() {
            console.log('worked...');
            done();
        });
        socket.on('disconnect', function() {
            console.log('disconnected...');
        })
    });

    afterEach(function(done) {
        // Cleanup
        if(socket.connected) {
            console.log('disconnecting...');
            socket.disconnect();
        } else {
            // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
            console.log('no connection to break...');
        }
        done();
    });


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

  	 

	it('Should succesfully log a new email address',function(done){


		const salty = [Math.random()].concat([Math.random()]).join("");
		email= salty+"test@gmail.com";

		socket.emit('sendEmailAddress', {
	      salty,
	      salty,
	      salty
        });
		
		//$scope.sendEmailAddress(salty+'@gmail.com',salty,salty);
		setTimeout(()=>{console.log($scope.error)}, 1500);

		setTimeout(()=>{expect($scope.error).toEqual('<h3>Email has been added, Congrats!</h3>'); done() },1500);
	})

	// it('Should throw an error when attempting to log an extant address',function(done){
	// 	const salty = [Math.random()].concat([Math.random()]).join("");
	// 	$scope.sendEmailAddress('bob@gmail.com',salty,salty);
	// 	setTimeout(()=>{expect($scope.error).to.equal('<h3>It looks like you\'ve already sent your info</h3>'); done()},500);
	// })

	// it('Should throw an error when attempting to log an extant name',function(done){

	// 	const salty = [Math.random()].concat([Math.random()]).join("");
	// 	$scope.sendEmailAddress(salty+'@gmail.com',"bob",salty);
	// 	setTimeout(()=>{expect($scope.error).to.equal('<h3>It looks like you\'ve already sent your info</h3>'); done()},500);
		
	// });

	// it('Should acknowledge if colleagues have sent email addresses',function(done){

	// 	const salty = [Math.random()].concat([Math.random()]).join("");
	// 	$scope.sendEmailAddress(salty+'@gmail.com',salty,"google");
	// 	setTimeout(()=>{expect($scope.error.split(" ").indexOf("google")).to.be.above(-1); done()},500);
		
	// });
})





// describe('should test clicking on the nav buttons', function() {

// });





// describe('successfull entry into database', function() {


// });