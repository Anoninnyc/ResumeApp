myApp.service('dummyService', function(){
  this.emailAction= (scope, loading , error, stories)=>{
    [scope.loading, scope.error, scope.stories]=[loading, error, stories];
  }
})