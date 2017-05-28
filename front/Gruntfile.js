'use strict'


module.exports = (grunt) => {
  grunt.initConfig({
    clean: {
      src: ['dist/*', '!dist/storage/**' ] //do not clean the storage folder
    },


    // Compile LESS
    less: {
      development: {
        options: {
          paths: ['static/css']
        },
        files: {
          'dist/css/style.css': 'static/css/style.less'
        }
      },
      production: {
        options: {
          paths: ['static/css'],
          plugins: [
            new (require('less-plugin-clean-css'))()
          ]
        },
        files: {
          'dist/css/style.css': 'static/css/style.less'
        }
      }
    },


    concat: {
      core: {
        src: ['index.html','views/*.hbs'],
        dest: 'dist/index.html'
      },
      models: {
        options: {
          separator: ';\n',
          banner: "'use strict'",
          process: (src, filepath) => {
            return src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1\n');
          }
        },
        src: ['models/*.js'],
        dest: 'dist/js/models.js'
      },
      collections: {
        options: {
          separator: ';\n',
          banner: "'use strict'",
          process: (src, filepath) => {
            return src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1\n');
          }
        },
        src: ['collections/*.js'],
        dest: 'dist/js/collections.js'
      },
      views: {
        options: {
          separator: ';\n',
          banner: "'use strict'",
          process: (src, filepath) => {
            return src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1\n');
          }
        },
        src: ['views/*.js'],
        dest: 'dist/js/views.js'
      },
    },


    // COPY
    copy: {
      css: {
        expand: true,
        cwd: 'static/css',
        src: '*.css',
        dest: 'dist/css',
        filter: 'isFile'
      },
      js: {
        expand: true,
        src: '*.js',
        dest: 'dist/js/',
        filter: 'isFile'
      },
      html: {
        src: ['terms.html', 'privacypolicy.hmtl'],
        dest: 'dist/'
      },
      img: {
        expand: true,
        cwd: 'static/img',
        src: '*.png',
        dest: 'dist/img',
      },
      i18n: {
        expand: true,
        src: 'i18n/**', dest: 'dist', filter: 'isFile'
      },
      bootstrap: {
        expand: true,
        cwd: 'bower_components/bootstrap/dist/css',
        src: '*', dest: 'dist/css/', filter: 'isFile'
      },
      bootstrapfonts: {
        expand: true,
        cwd: 'bower_components/bootstrap/dist/fonts',
        src: '*', dest: 'dist/fonts', filter: 'isFile'
      },
      bootstrapdatepicker: {
        expand: true,
        cwd: 'bower_components/eonasdan-bootstrap-datepicker/build/css',
        src: '*', dest: 'dist/css', filter: 'isFile'
      },
      select2css: {
        expand: true,
        cwd: 'bower_components/select2/dist/css',
        src: '*', dest: 'dist/css', filter: 'isFile'
      },
      select2js: {
        expand: true,
        cwd: 'bower_components/select2/dist/js',
        src: '*', dest: 'dist/js', filter: 'isFile'
      },

      select2boostrap: {
        expand: true,
        cwd: 'bower_components/select2-bootstrap-theme/dist',
        src: '*', dest: 'dist/css', filter: 'isFile'
      },

      bootstrapmenu: {
        expand: true,
        cwd: 'bower_components/bootstrap-submenu/dist/css',
        src: '*', dest: 'dist/css', filter: 'isFile'
      },

      calendartmpls: {
        expand: true,
        src: 'tmpls/**', dest: 'dist/'
      }

    },
    bower: {
      dev: {
        dest: 'dist',
        js_dest: 'dist/js/vendor',
        css_dest: 'dist/css',
        options: {
          packageSpecific: {
            'bootstrap': {
              files: { src:'dist/**', dest:'dist/css' }
            },
            'handlebars': {
              files: ['./*.js']
            }
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less')

  grunt.registerTask('default', ['clean', 'less:development', 'concat',
    'copy', 'bower']);
  grunt.registerTask('production', ['clean', 'less:production', 'concat',
    'copy', 'bower']);

};
