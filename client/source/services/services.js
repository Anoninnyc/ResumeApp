myApp.service('dummyService', function(){
  this.emailAction= (scope, loading , error, stories, clear)=>{
    [scope.loading, scope.error, scope.stories]=[loading, error, stories];
    scope.$apply();
    if (clear){
    	console.log(clear)
    	
    	$("#emailAddress,#emailName,#emailCompany").val("");
    	$("#emailName,#emailCompany").css({display:"none"});
     }
  }
})