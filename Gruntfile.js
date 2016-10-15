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

  karma: {
    unit: {
      configFile: 'karma.conf.js'
    }
  },

  mocha: {
    test: {
      src: ['tests/testrunner.html'],
      dest: 'tests/output.out'
    },
//
    options: {
      run: true,
      timeout: 20000,
    }
  },
  shell: {
    test: {
      command: ['grunt karma','git add .'].join('&&')
    },
    addAndDeploy: {
      command: mess => ['webpack', 'git add .', 'git commit -m' + mess, 'git push salty master -f'].join('&&')
    }
  },
});


  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('test', ['mocha'])


  //grunt shell:addAndDeploy:Message_Here
  //grunt shell:test

  grunt.registerTask('testGrunt', () => {
    console.log('testing grunt!');
  })


}
