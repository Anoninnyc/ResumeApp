myApp.service('dummyService', function(){
	
  this.emailAction= (scope, loading , error, stories, clear)=>{
    [scope.loading, scope.error, scope.stories]=[loading, error, stories];

	if (clear){    	
		$("#emailAddress,#emailName,#emailCompany").val("");
	 }
  }

  this.watchAction = (scope, watchVar, elem)=>{
     $("#action").css({opacity:1});
        scope[watchVar] = true;

        let el = $(`#${elem}`),
        curHeight = el.height(),
        autoHeight = el.css('height', 'auto').height();

        el.height(curHeight).css({
          padding: 0,
          display: "inline"
        }).animate({
          height: autoHeight,
          padding: 14
        }, 100);
  }

})