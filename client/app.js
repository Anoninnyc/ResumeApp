
myApp = angular.module('myApp', ['ngRoute', 'ngSanitize']);

require('./source/controllers/mainController.js');
require('./source/services/services.js');
require('./source/config.js');

myApp.directive('navBar', function() {
  return {
      restrict: 'AE',
      replace: 'true',
      templateURL: './source/views/navBar.html'
  };
});