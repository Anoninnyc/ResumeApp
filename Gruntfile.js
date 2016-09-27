module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

      uglify: {
      my_target: {
        files: {
          'client/minApp.js': ['client/bundle.js'],
        }
      }
    },
    mocha: {
      all: {
        src: ['specrunner.html'],
      },
      options: {
        run: true
      }
    },
    shell: {
      addAndDeploy: {
        command: mess => ['webpack', 'git add .', 'git commit -m' + mess, 'git push salty master -f'].join('&&')
      }
    },
  });

  grunt.loadNpmTasks('grunt-mocha')
  grunt.loadNpmTasks('grunt-shell')

  grunt.registerTask('push', ['shell:addAndDeploy'])
  grunt.registerTask('test', ['mocha'])



  //grunt shell:addAndDeploy:Message_Here

  grunt.registerTask('testGrunt', () => {
    console.log('testing grunt!')
  })


}
