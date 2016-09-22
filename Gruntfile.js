module.exports = function(grunt) {






grunt.initConfig({
   uglify: {
    my_target: {
      files: {
        'client/minApp.js': ['client/app.js'],
      }
    }
  },
  shell: {
	  prodServer: {
	    command: 'git push salty master -f'
	  }
  },
});



	grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-watch');



	grunt.registerTask('push',['shell'])


	grunt.registerTask('default',['speak', 'talk'])
	// runs on 'Grunt'

	
		//Grunt plugin!!!!

}