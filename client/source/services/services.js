myApp.service('dummyService', function(){
  this.emailAction= (scope, loading , error, stories, clear)=>{
    [scope.loading, scope.error, scope.stories]=[loading, error, stories];

    if (clear){
    	//console.log(clear)
    	
    	$("#emailAddress,#emailName,#emailCompany").val("");
    	//$("#action").css({opacity:1});
     }
  }
})