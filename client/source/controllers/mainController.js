var utils = require("../utils");

myApp.controller('myCtrl', function($scope, dummyService) {

  const scopeProps = {
    check: 'Angular is registered',
    flagCompany: false,
    flagAddress: false,
    flagName: false,
    contactMessage: "Interested in learning more?",
  };

  Object.assign($scope, scopeProps);


  $scope.$watchGroup(['address', 'name', 'company'], function(newValues, oldValues, scope) {

    [address, name, company] = [oldValues[0], oldValues[1], oldValues[2]];

    if (address) {
      if (address.length === 4 && !$scope.flagAddress) {
        dummyService.watchAction($scope, "flagAddress", "emailName");
      }
    }
    if (name) {
      if (name.length === 3 && !$scope.flagName) {
        dummyService.watchAction($scope, "flagName", "emailCompany");
      }
    }
    if (company) {
      if (company.length === 3 && !$scope.flagCompany) {
        dummyService.watchAction($scope, "flagCompany", "comment");
        document.getElementById("action").disabled = false;
      }
    }

  });


  dummyService.emailAction($scope, false, null, []);
  $scope.sendEmailAddress = (address, name, company, comment) => {

    if (!utils.reg.test(address)) {
      dummyService.emailAction($scope, false, "<h3>Please enter a valid Email Address.</h3>", []);
    } else if (!name.length) {
      dummyService.emailAction($scope, false, "<h3>Please enter a valid name.</h3>", []);
    } else if (!company.length) {
      dummyService.emailAction($scope, false, "<h3>Please enter a valid company name</h3>", []);
    } else {

      socket.emit('sendEmailAddress', {
        address,
        name,
        company,
        comment,
      });
      dummyService.emailAction($scope, true, null, []);

      socket.once('loggedToDB', msg => {
        const addOn = msg.companyInfo ? `\nIt looks like ${msg.companyInfo[1]} from ${msg.companyInfo[0]} has also registered interest!` : "";
        dummyService.emailAction($scope, false, `<h3>Email has been added- Thanks!${addOn}</h3>`, msg.storyInfo, true);
        [$scope.comment, $scope.name, $scope.company, $scope.contactMessage] = ["", "", "", "Wanna Send Again?"];
        $(".form-control").css({
          width:"70%"
        });
        $scope.$apply();
      })

      socket.once('emailExtant', msg => {
        dummyService.emailAction($scope, false, "<h3>It looks like you've already sent your info</h3>", []);
        $scope.$apply();
      });

    };
  }
})


myApp.run(function($rootScope) {
  $rootScope.count = 3;
  const map = {
    "/contact": "Contact Page",
    "/techUsed": "Tech Used",
    "/resume": "My Resume",
    "/": "Welcome!"
  };


  $rootScope.countdown = function() {
    console.log("coutingDOWN!!!")
    if ($rootScope.count > 1) {
      $rootScope.count--;
    } else if ($rootScope.count === 1) {
      $rootScope.count = "GO!";
    } else {
      $rootScope.count = null;
    }

  };

  $rootScope.$on("$routeChangeStart", (e, current) => {
    console.log(e, current.$$route.originalPath);
    $rootScope.currRoute = map[current.$$route.originalPath];
  })


  $rootScope.$on('$routeChangeSuccess', (e, current) => {
    let path = current.$$route.originalPath;
    if (path === "/techUsed" && $rootScope.counting !== 1) {
      $rootScope.count = 3;
      $rootScope.counting = 1;

      for (var i = 500; i < 2001; i += 500) {
        (function(i) {
          setTimeout(function() {
            $rootScope.countdown();
            $rootScope.$apply();
            if (i === 2000) {
              $rootScope.counting = 2;
              $(".tech").css({
                display: "inline"
              })
              $rootScope.$apply();
            }
          }, i)
        }(i));
      }
    }
    if (moveIt !== undefined) {
      clearInterval(moveIt);
    }


    $rootScope.currRoute = map[path];
    console.log(path)
  });
});
