module.exports = function(grunt) {
  require('time-grunt')(grunt);

  require('jit-grunt')(grunt);

  grunt.initConfig({
    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      build: {
        src: 'assets/css/screen.css',
        dest: 'assets/css/screen.css'
      },
      jekyll: {
        src: '_site/assets/css/screen.css',
        dest: '_site/assets/css/screen.css'
      }
    },

    clean: {
      site_assets: [
        '_site/assets/images',
        '_site/assets/media'
      ],
      css_maps: [
        'assets/css/**/*.map'
      ]
    },

    copy: {
      css: {
        files: [{
          expand: true,
          src: ['assets/css/**'],
          dest: '_site/'
        }]
      },
      normalize: {
        expand: true,
        flatten: true,
        filter: 'isFile',
        src: 'bower_components/normalize-css/normalize.css',
        dest: 'assets/sass/core/',
        rename: function(dest, src) {
          return dest + src.replace('.css', '.scss');
        }
      }
    },

    concat: {
      build: {
        files: {
          'assets/js/jonsuh.js': [
            'bower_components/picturefill/dist/picturefill.js',
            // 'bower_components/jquery/dist/jquery.js',
            // 'bower_components/jquery-form/jquery.form.js',
            // 'bower_components/jquery-validation/dist/jquery.validate.js',
            // 'assets/js/vendor/mailchimp/mailchimp-validate.js',
            'assets/js/src/utility.js',
            'assets/js/src/social.js',
            'assets/js/src/work.js',
            'assets/js/src/app.js'
          ],
          'assets/js/chart.js': [
            'bower_components/chartjs/src/Chart.Core.js',
            'bower_components/chartjs/src/Chart.Line.js',
            'assets/js/vendor/Chart.legend.js'
          ],
          'assets/js/blog/https-increased-organic-search-impressions-by-144-percent.js': ['assets/js/src/blog/https-increased-organic-search-impressions-by-144-percent.js'],
          '_includes/critical/js/global.js': ['assets/js/src/critical.js'],
        }
      }
    },

    criticalcss: {
      options: {
        filename: '/Users/jsuh/Work/jonsuh.com/assets/css/screen.css',
        width: 1025,
        height: 700,
        buffer: 800*1024
      },
      home: {
        options: {
          url: 'http://jonsuh.local/',
          outputfile: '_includes/critical/css/home.css',
        }
      },
      about: {
        options: {
          url: 'http://jonsuh.local/about/',
          outputfile: '_includes/critical/css/about.css',
        }
      },
      blog: {
        options: {
          url: 'http://jonsuh.local/blog/',
          outputfile: '_includes/critical/css/blog.css',
        }
      },
      blog_post: {
        options: {
          url: 'http://jonsuh.local/blog/august-smart-lock/',
          outputfile: '_includes/critical/css/blog-post.css',
        }
      },
      contact: {
        options: {
          url: 'http://jonsuh.local/contact/',
          outputfile: '_includes/critical/css/contact.css',
        }
      },
      work: {
        options: {
          url: 'http://jonsuh.local/work/',
          outputfile: '_includes/critical/css/work.css',
        }
      }
    },

    jekyll: {
      build: {
        options: {
          config: '_config.yml'
        }
      },
      watch: {
        options: {
          watch: true
        }
      },
      staging: {
        options: {
          config: '_config.yml,_config.staging.yml'
        }
      },
      production: {
        options: {
          config: '_config.yml,_config.production.yml'
        }
      }
    },

    sass: {
      options: {
        includePaths: [
          'bower_components/bourbon/dist',
          'bower_components/mq-sass/stylesheets',
          'bower_components/neat/app/assets/stylesheets'
        ]
      },
      build: {
        files: [{
          expand: true,
          cwd: 'assets/sass/',
          src: ['*.scss', 'blog/*.scss'],
          dest: 'assets/css/',
          ext: '.css'
        }]
      },
      jekyll: {
        files: [{
          expand: true,
          cwd: 'assets/sass/',
          src: ['*.scss', 'blog/*.scss'],
          dest: '_site/assets/css/',
          ext: '.css'
        }]
      }
    },

    concurrent: {
      watch: {
        options: {
          logConcurrentOutput: true
        },
        tasks: ['shell:jekyll', 'watch'],
      }
    },

    cssmin: {
      options: {
        report: 'min'
      },
      critical: {
        files: [{
          expand: true,
          cwd: '_includes/critical/css/',
          src: ['**/*.css'],
          dest: '_includes/critical/css/',
          ext: '.css'
        }]
      },
      production: {
        files: [{
          expand: true,
          cwd: 'assets/css/',
          src: ['**/*.css'],
          dest: 'assets/css/',
          ext: '.css'
        }]
      }
    },

    uglify: {
      options: {
        report: 'gzip'
      },
      critical: {
        files: [{
          expand: true,
          cwd: '_includes/critical/js/',
          src: [
            '**/*.js'
          ],
          dest: '_includes/critical/js/',
          ext: '.js'
        }]
      },
      production: {
        files: [{
          expand: true,
          cwd: 'assets/js/',
          src: [
            '**/*.js',
            '!src/**/*.js',
            '!vendor/**/*.js'
          ],
          dest: 'assets/js/',
          ext: '.js'
        }]
      },
    },

    rsync: {
      options: {
        args: ["-a"],
        host: '' // PARTS OF THIS LINE HAVE BEEN REMOVED
      },
      images_staging: {
        options: {
          src: '_site/assets/images/',
          dest: '', // PARTS OF THIS LINE HAVE BEEN REMOVED
        }
      },
      media_staging: {
        options: {
          src: '_site/assets/media/',
          dest: '', // PARTS OF THIS LINE HAVE BEEN REMOVED
        }
      },
      images_production: {
        options: {
          src: '_site/assets/images/',
          dest: '', // PARTS OF THIS LINE HAVE BEEN REMOVED
        }
      },
      media_production: {
        options: {
          src: '_site/assets/media/',
          dest: '', // PARTS OF THIS LINE HAVE BEEN REMOVED
        }
      }
    },

    shell: {
      options: {
        stdout: true,
        stderr: true
      },
      caniuse: {
        command: 'npm update caniuse-db'
      },
      jekyll: {
        command: 'jekyll build --watch'
      },
      deploy_staging: {
        command: 'bundle exec cap staging deploy'
      },
      deploy_production: {
        command: 'bundle exec cap production deploy'
      }
    },

    watch: {
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['concat:build']
      },
      jekyll: {
        files: ['_site/assets/css/*.css'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['assets/js/src/**/*.js'],
        tasks: ['concat:build']
      },
      sass: {
        files: ['assets/sass/**/*.scss'],
        tasks: ['sass:jekyll', 'autoprefixer:jekyll']
      }
    }
  });

  grunt.registerTask('build', ['newer:copy:normalize', 'sass:build', 'autoprefixer:build', 'concat:build', 'jekyll:build']);
  grunt.registerTask('default', ['build', 'concurrent:watch']);

  grunt.registerTask('production', ['copy:normalize', 'sass:build', 'clean:css_maps', 'autoprefixer:build', 'concat:build', 'cssmin:production', 'uglify:production', 'uglify:critical', 'jekyll:production'])

  grunt.registerTask('deploy:staging', [
    'build',                  // Grunt build
    'jekyll:staging',         // Rebuild Jekyll for staging
    'rsync:images_staging',   // Rsync _site/assets/images to staging environment
    'rsync:media_staging',    // Rsync _site/assets/media to staging environment
    'clean:site_assets',      // Clean _site/assets/(images,media) to prep for deployment
    'shell:deploy_staging'    // Capistrano deploy to staging environment
  ]);

  grunt.registerTask('deploy:production', [
    'production',              // Grunt production
    'clean:site_assets',       // Clean _site/assets/(images,media) to prep for deployment
    'shell:deploy_production'  // Capistrano deploy to production environment
  ]);

  grunt.registerTask('deploy:production:all', [
    'production',              // Grunt production
    'rsync:images_production', // Rsync _site/assets/images to production environment
    'rsync:media_production',  // Rsync _site/assets/media to production environment
    'clean:site_assets',       // Clean _site/assets/(images,media) to prep for deployment
    'shell:deploy_production'  // Capistrano deploy to production environment
  ]);
};