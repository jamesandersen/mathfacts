/*global module:false*/
module.exports = function (grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        copy: {
            js: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/jquery/',
                        src: ['jquery.*'],
                        dest: 'js/libs/jquery/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/respond/',
                        src: ['respond.min.js'],
                        dest: 'js/libs/respond/'
                    }
                ]
            }
        },

        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['lib/<%= pkg.name %>.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        less: {
            production: {
                options: {
                    yuicompress: true
                },
                files: {
                    "css/styles.min.css": "css/style.less"
                }
            }
        },
        uglify: {
            /*options: {
                banner: '<%= banner %>'
            },*/
            dist: {
                src: 'js/app/*.js',
                dest: 'js/app.min.js'
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                }
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            app: {
                src: 'js/app/**/*.js'
            },
            tests: {
                src: '_test/tests/**/*.js'
            }
        },
        qunit: {
            files: ['_test/**/*.html']
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib_test: {
                files: '<%= jshint.tests.src %>',
                tasks: ['jshint:tests', 'qunit']
            },
            app: {
                files: ['<%= jshint.gruntfile.src %>', '<%= jshint.app.src %>', 'index.html', 'css/*.less'],
                tasks: ['copy', 'less', 'modernizr']
            }
        },
        modernizr: {

            // [REQUIRED] Path to the build you're using for development.
            "devFile": "bower_components/modernizr/modernizr.js",

            // [REQUIRED] Path to save out the built file.
            "outputFile": "js/libs/modernizr/modernizr-custom.js",

            // Based on default settings on http://modernizr.com/download/
            "extra": {
                "shiv": true,
                "printshiv": false,
                "load": true,
                "mq": false,
                "cssclasses": true
            },

            // Based on default settings on http://modernizr.com/download/
            "extensibility": {
                "addtest": false,
                "prefixed": false,
                "teststyles": false,
                "testprops": false,
                "testallprops": false,
                "hasevents": false,
                "prefixes": false,
                "domprefixes": false
            },

            // By default, source is uglified before saving
            "uglify": true,

            // Define any tests you want to implicitly include.
            "tests": [],

            // By default, this task will crawl your project for references to Modernizr tests.
            // Set to false to disable.
            "parseFiles": true,
            
            // When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
            // You can override this by defining a "files" array below.
            "files" : ["js/app/**/*", "css/styles.min.css", "index.html"],

            // When parseFiles = true, matchCommunityTests = true will attempt to
            // match user-contributed tests.
            "matchCommunityTests": false,

            // Have custom Modernizr tests? Add paths to their location here.
            "customTests": []
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-modernizr");

    // Default task.
    grunt.registerTask('default', ['less', 'copy', 'jshint:gruntfile', 'uglify']);
    grunt.registerTask('test', ['copy', 'jshint:gruntfile', 'qunit', 'uglify']);

};