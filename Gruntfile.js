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
	  },
    addAndCommit: message=>{
      //['git add .',`git commit -m ${message}`].join('&&')
      console.log(`${message}`)
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