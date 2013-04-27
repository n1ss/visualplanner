/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/* <%= pkg.name %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n\n',
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['dist/concated.js'],
        dest: 'dist/main.min.js'
      }
    },
    clean: {
      src: ['dist/concated.js']
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      src: {
        options: {
          jshintrc: 'js/.jshintrc'
        },
        src: ['js/**/*.js']
      }
    },
    jsttojs: {
      root: 'js/Templates',
      output: 'js/Templates/templates.js',
      ext: 'html',
      removebreak: true,
      amd: true,
      requirements: ['handlebars']
    },
    requirejs: {
      compile: {
        options: {
          locale: "ru-ru",
          baseUrl: 'js',
          include: ['../vendors/almond/almond'],
          paths: {
            underscore: '../vendors/underscore/underscore-min',
            backbone: '../vendors/backbone/backbone-min',
            handlebars: '../vendors/handlebars.js/dist/handlebars',
            tmpl: 'Classes/Template',
          },
          shim: {
            'underscore': {
              exports: '_'
            },
            'backbone': {
              deps: ['underscore'],
              exports: 'Backbone'
            },
            'handlebars': {
              exports: 'Handlebars'
            }
          },
          name: 'main',
          out: 'dist/concated.js'
        }
      }
    },
    less: {
      production: {
        options: {
          yuicompress: true
        },
        files: {
          "dist/main.css": "less/main.less"
        }
      }
    },
    watch: {
      jsttojs: {
        files: 'js/Templates/**/*.html',
        tasks: 'jsttojs'
      },
      jshint: {
        files: 'js/**/*.js',
        tasks: 'jshint:src'
      }
    }
  });

  //Modules
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-jsttojs');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task.
  grunt.registerTask('default', ['jshint:src', 'jsttojs', 'requirejs:compile', 'concat:dist', 'less', 'clean']);

};
