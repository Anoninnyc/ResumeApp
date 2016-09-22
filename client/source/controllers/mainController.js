myApp.controller('myCtrl', function($scope,dummyService) {
  $scope.repeatables = ["Send something, please!"];
  $scope.check = 'Angular is registered';


  $scope.$watch('address', function (newValue, oldValue, scope) {
    console.log(newValue, oldValue);
    if (newValue.length>4){
      $("#emailName").css({display:"inline"});
    }
  }, true);

  $scope.$watch('name', function (newValue, oldValue, scope) {
    console.log(newValue, oldValue);
    if (newValue.length>3){
      $("#emailCompany").css({display:"inline"});
    }
  }, true);


  dummyService.emailAction($scope, false, null, []);

  $scope.sendEmailAddress = (address, name, company)=> {
      socket.emit('sendEmailAddress', {address, name, company});
      dummyService.emailAction($scope, true, null, []);

    socket.once('loggedToDB', msg=> {
      console.log('reccccc')
        const addOn= msg.companyInfo? ` It looks like ${msg.companyInfo[1]} from ${msg.companyInfo[0]} has also registered interest!`: "";
        dummyService.emailAction($scope, false, `<h3>Email has been added, Congrats!${addOn}</h3>`, msg.storyInfo, true);
         $scope.$apply();
    })

    socket.once('emailExtant', msg=> {
        dummyService.emailAction($scope, false, "<h3>It looks like you've already sent your info</h3>", []);
        $scope.$apply();
    });

    socket.once('invalidEmail', msg=> {
      console.log('invalid email!');
        dummyService.emailAction($scope, false, "<h3>Please enter a valid Email Address.</h3>", []);
        $scope.$apply();
    });


    socket.once('invalidName', msg=> {
      console.log('IN is being hit');
        dummyService.emailAction($scope, false, "<h3>Please enter a valid Email Address.</h3>", []);
        $scope.$apply();
    });

     socket.once('invalidCompany', msg=> {
        console.log('IC is being hit');
         dummyService.emailAction($scope, false, "<h3>Please enter a valid company name</h3>", []);
        $scope.$apply();
    });

  };

})
