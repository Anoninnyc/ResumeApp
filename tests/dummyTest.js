
describe('myCtrl Controller', function() {


beforeEach(function(done) {
        // Setup
         socket = io.connect(
         	'https://krishanmarya.herokuapp.com'
  		,{
		  transports: ['websocket'],
		  'force new connection': true
		}
		)

        socket.on('connect', function() {
            console.log('worked...');
            done();
        });

        socket.on('connect_error', function(a) {
            console.log(a);
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
		$scope.sendEmailAddress("skdjfhdsjlfh@dsjkfhsdfk.com,slddffds,sdklfjsldfkj")
		socket.emit('sendEmailAddress', {
	      salty,
	      salty,
	      salty
        });
		

	})

})
