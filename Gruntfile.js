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
      ],
      s3: [
        '_s3'
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
      critical_css: {
        files: [{
          expand: true,
          flatten: true,
          src: ['_includes/critical/css/src/**'],
          dest: '_includes/critical/css/',
        }]
      },
      normalize: {
        expand: true,
        flatten: true,
        filter: 'isFile',
        src: 'bower_components/normalize-css/_normalize.css',
        dest: 'assets/sass/core/',
        rename: function(dest, src) {
          return dest + src.replace('.css', '.scss');
        }
      },
      robots_staging: {
        src: 'robots.staging.txt',
        dest: '_site/robots.txt'
      },
      robots_production: {
        src: 'robots.production.txt',
        dest: '_site/robots.txt'
      },
      images_production: {
        expand: true,
        cwd: '_site/assets/images',
        src: ['**/*', '!blog', '!blog/**/*', '!browsers', '!browsers/**/*'],
        dest: '_s3/assets/images',
      }
    },

    concat: {
      build: {
        files: {
          'assets/js/jonsuh.js': [
            // 'assets/js/vendor/promise.js',
            // 'bower_components/picturefill/dist/picturefill.js',
            // 'bower_components/fontfaceobserver/fontfaceobserver.js',
            'assets/js/src/utility.js',
            'assets/js/src/social.js',
            'assets/js/src/work.js',
            'assets/js/src/app.js'
          ],
          'assets/js/chart.js': [
            'bower_components/chartjs/src/Chart.Core.js',
            'bower_components/chartjs/src/Chart.Line.js',
            'bower_components/chartjs/src/Chart.Doughnut.js',
            'assets/js/vendor/Chart.legend.js'
          ],
          'assets/js/flickity.js': ['bower_components/flickity/dist/flickity.pkgd.js'],
          'assets/js/blog/https-increased-organic-search-impressions-by-144-percent.js': ['assets/js/src/blog/https-increased-organic-search-impressions-by-144-percent.js'],
          'assets/js/blog/need-for-speed-2.js': ['assets/js/src/blog/need-for-speed-2.js'],
          '_includes/critical/js/head.js': [
            'bower_components/loadcss/loadCSS.js',
            'assets/js/vendor/promise.js',
            'bower_components/fontfaceobserver/fontfaceobserver.js',
            'assets/js/src/critical-head.js',
          ],
          '_includes/critical/js/foot.js': [
            'assets/js/src/critical-foot.js',
          ],
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
          url: 'http://jonsuh.local/blog/font-loading-with-font-events/',
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
      options: {
        bundleExec: true
      },
      build: {
        options: {
          config: '_config.yml'
        }
      },
      watch: {
        options: {
          config: '_config.yml',
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
          'bower_components/bourbon/app/assets/stylesheets',
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
        tasks: ['jekyll:watch', 'watch'],
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
          src: ['*.css'],
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

    imagemin: {
      production: {
        options: {
          optimizationLevel: 7,
        },
        files: [{
          expand: true,
          cwd: 'assets/images',
          src: [
            '**/*.{gif,jpg,png}',
            '!_site'
          ],
          dest: 'assets/images'
        }]
      }
    },

    aws: grunt.file.readJSON('aws-keys.json'),
    aws_s3: {
      options: {
        accessKeyId: '<%= aws.AWSAccessKeyId %>',
        secretAccessKey: '<%= aws.AWSSecretKey %>',
        uploadConcurrency: 5,
        downloadConcurrency: 5,
        access: 'public-read',
      },
      production: {
        options: {
          bucket: 'jonsuh.com',
        },
        files: [
          {
            expand: true,
            cwd: '_s3/assets',
            src: ['**/*.{css,js}'],
            dest: 'assets',
            params: {
              ContentEncoding: 'gzip',
              CacheControl: 'max-age=2629000'
            }
          },
          {
            expand: true,
            cwd: '_s3/assets/images',
            src: ['**/*'],
            dest: 'assets/images',
            differential: true,
            params: {
              CacheControl: 'max-age=86400'
            }
          },
        ]
      }
    },

    compress: {
      production: {
        options: {
          mode: 'gzip',
          level: 6
        },
        files: [
          {
            expand: true,
            cwd: 'assets',
            src: ['**/*.{css,js}', '!js/src/**/*', '!js/vendor/**/*'],
            dest: '_s3/assets'
          }
        ]
      }
    },

    replace: {
      critical_css: {
        options: {
          patterns: [
            {
              match: /url\(\/assets/g,
              replacement: 'url(https://d281e42xwg0cwl.cloudfront.net/assets'
            }
          ]
        },
        files: [
          {
            expand: true,
            cwd: '_includes/critical/css',
            src: ['*.css'],
            dest: '_includes/critical/css'
          }
        ]
      }
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
        command: 'bundle exec jekyll build --watch'
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
      js: {
        files: ['assets/js/src/**/*.js'],
        tasks: ['concat:build']
      },
      sass: {
        files: ['assets/sass/**/*.scss'],
        tasks: ['sass:jekyll', 'autoprefixer:jekyll']
      }
    },

    browserSync: {
      watch: {
        options: {
          watchTask: true,
          proxy: 'http://jonsuh.local'
        },
        bsFiles: {
          src: [
            '_site/assets/css/*.css'
          ]
        }
      }
    }
  });

  grunt.registerTask('build', [
    'newer:copy:normalize',
    'sass:build',
    'autoprefixer:build',
    'copy:critical_css',
    'concat:build',
    'jekyll:build'
  ]);

  grunt.registerTask('default', [
    'newer:copy:normalize',
    'sass:build',
    'autoprefixer:build',
    'copy:critical_css',
    'concat:build',
    'browserSync',
    'concurrent:watch'
  ]);

  grunt.registerTask('production', [
    'copy:normalize',
    'sass:build',
    'clean:css_maps',
    'clean:s3',
    'autoprefixer:build',
    'concat:build',
    'cssmin:production',
    'copy:critical_css',
    'replace:critical_css',
    'cssmin:critical',
    'uglify:production',
    'uglify:critical',
    'compress:production',
    'jekyll:production'
  ]);

  grunt.registerTask('deploy:staging', [
    'build',                  // Grunt build
    'jekyll:staging',         // Rebuild Jekyll for staging
    'rsync:images_staging',   // Rsync _site/assets/images to staging environment
    'rsync:media_staging',    // Rsync _site/assets/media to staging environment
    'clean:site_assets',      // Clean _site/assets/(images,media) to prep for deployment
    'copy:robots_staging',    // Copy the staging version of robots.txt for deployment
    'shell:deploy_staging'    // Capistrano deploy to staging environment
  ]);

  grunt.registerTask('deploy:production', [
    'production',              // Grunt production
    'clean:site_assets',       // Clean _site/assets/(images,media) to prep for deployment
    'copy:robots_production',  // Copy the production version of robots.txt for deployment
    'shell:deploy_production', // Capistrano deploy to production environment
    'aws_s3:production'        // Deploy gzipped CSS and JS to S3
  ]);

  grunt.registerTask('deploy:production:only', [
    'production',              // Grunt production
    'clean:site_assets',       // Clean _site/assets/(images,media) to prep for deployment
    'copy:robots_production',  // Copy the production version of robots.txt for deployment
    'shell:deploy_production', // Capistrano deploy to production environment
  ]);

  grunt.registerTask('deploy:production:all', [
    'production',              // Grunt production
    'rsync:images_production', // Rsync _site/assets/images to production environment
    'rsync:media_production',  // Rsync _site/assets/media to production environment
    'copy:images_production',  // Copy _site/assets/images to _s3 to prep for S3 deployment
    'aws_s3:production',       // Deploy gzipped CSS and JS, and images to S3
    'clean:site_assets',       // Clean _site/assets/(images,media) to prep for deployment
    'copy:robots_production',  // Copy the production version of robots.txt for deployment
    'shell:deploy_production'  // Capistrano deploy to production environment
  ]);
};