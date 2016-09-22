module.exports = function(grunt) {






grunt.initConfig({
   uglify: {
    my_target: {
      files: {
        'client/minApp.js': ['client/app.js'],
      }
    }
  }
});








   grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-watch');



	grunt.registerTask('speak',function(){
		console.log("I'm speaking!!!");
	})

	grunt.registerTask('talk',function(){
		console.log("talking");
	})

	grunt.registerTask('default',['speak', 'talk'])
	// runs on 'Grunt'

	
		//Grunt plugin!!!!

}