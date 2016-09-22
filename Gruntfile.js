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
	    command: ['git add .','grunt shell:greet','webpack','git push salty master -f'].join('&&')
	  },
    greet: {
      command: ()=> 'git commit -m "Grunt Automated Commit" '
    }
  },
});



	grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('push', ['shell:multiple'])

  //grunt shell:addAndCommit:"test commit"

	grunt.registerTask('testGrunt',()=>{
    console.log('testing grunt!')
  })


}