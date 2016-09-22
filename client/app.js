
myApp = angular.module('myApp', ['ngRoute', 'ngSanitize'])


// Directives

require('./source/controllers/mainController.js');
require('./source/services/services.js');
require('./source/config.js');

app.directive('navBar', function() {
  return {
      restrict: 'AE',
      replace: 'true',
      template: `<nav class="navbar navbar-default">
      <div class="container-fluid"><div class="navbar-header">
      <a class="navbar-brand">Krishan M Aryas Resume</a>
    </div>
    <ul class="nav navbar-nav">
      <li><a href="/">Resume</a></li>
      <li><a href="/interested">Register Interest</a></li>
    </ul>
  </div>
</nav>`
  };
});