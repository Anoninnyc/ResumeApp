myApp.controller('myCtrl', function($scope,dummyService) {
  $scope.repeatables = ["Send something, please!"];
  $scope.check = 'Angular is registered';
  $scope.flagAddress=false;
  $scope.flagName=false;
  $scope.contactMessage="Interested in learning more?"



  $scope.$watch('address', function (newValue, oldValue, scope) {
      if (oldValue){
        if (oldValue.length===4 && !$scope.flagAddress){
          $scope.flagAddress=true;



          let el = $('#emailName');
          curHeight = el.height();
          autoHeight = el.css('height', 'auto').height();

          el.height(curHeight).css({padding:0, display:"inline"}).animate({height: autoHeight, padding:14}, 100);
          
        }
      }
  });

  $scope.$watch('name', function (newValue, oldValue, scope) {
     if (oldValue){
    if (oldValue.length===3 && !$scope.flagName){
      $scope.flagName=true;

          let el2 = $('#emailCompany'),
          curHeight = el2.height(),
           autoHeight = el2.css('height', 'auto').height();
          el2.height(curHeight).css({padding:0, display:"inline"}).animate({height: autoHeight, padding:14}, 100);
    }
  }
  });


  dummyService.emailAction($scope, false, null, []);

  $scope.sendEmailAddress = (address, name, company)=> {
      socket.emit('sendEmailAddress', {address, name, company});
      dummyService.emailAction($scope, true, null, []);

    socket.once('loggedToDB', msg=> {
     
        const addOn= msg.companyInfo? ` It looks like ${msg.companyInfo[1]} from ${msg.companyInfo[0]} has also registered interest!`: "";
        dummyService.emailAction($scope, false, `<h3>Email has been added, Congrats!${addOn}</h3>`, msg.storyInfo, true);
         [$scope.name,$scope.company,$scope.contactMessage]=["","","Wanna Send Again?"];
         $scope.$apply();
    })

    socket.once('emailExtant', msg=> {
        dummyService.emailAction($scope, false, "<h3>It looks like you've already sent your info</h3>", []);
        $scope.$apply();
    });

    socket.once('invalidEmail', msg=> {
        dummyService.emailAction($scope, false, "<h3>Please enter a valid Email Address.</h3>", []);
        $scope.$apply();
    });


    socket.once('invalidName', msg=> {

        dummyService.emailAction($scope, false, "<h3>Please enter a valid name.</h3>", []);
        $scope.$apply();
    });

     socket.once('invalidCompany', msg=> {
         dummyService.emailAction($scope, false, "<h3>Please enter a valid company name</h3>", []);
         $scope.$apply();
    });

  };

})
