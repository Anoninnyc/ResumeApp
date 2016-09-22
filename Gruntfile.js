module.exports = function(grunt) {

grunt.initConfig({
   uglify: {
    my_target: {
      files: {
        'client/minApp.js': ['client/bundle.js'],
      }
    }
  },
  shell: {
	  multiple: {
	    command: ['git add .','git commit -m "Grunt Automated Commit" ','webpack','git push salty master -f'].join('&&')
	  }
  },
});



	grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('push',['shell:multiple'])


  

	grunt.registerTask('testGrunt',()=>{
    console.log('testing grunt!')
  })


}