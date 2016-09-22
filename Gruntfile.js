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
    addAndDeploy: {
      command: mess=> ['git add .','git commit -m' + mess, 'webpack','git push salty master -f'].join('&&')
    }
  },
});


	grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask('push', ['shell:addAndDeploy'])

  //grunt shell:addAndDeploy:Message_Here

	grunt.registerTask('testGrunt',()=>{
    console.log('testing grunt!')
  })


}