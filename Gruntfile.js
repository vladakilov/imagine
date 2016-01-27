module.exports = function(grunt) {

    // Configuration goes here
    grunt.initConfig({

        clean: [
            'dist'
        ],

        qunit: {
            all: ['test/**/*.html']
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                unused: true,
                esversion: 6
            },
            uses_defaults: [
                'Gruntfile.js',
                'src/**/*.js',
                'test/**/*.js',
                '!src/_start.js',
                '!src/_end.js'
            ]
        },

        browserify: {
            dev: {
                options: {
                    browserifyOptions: {
                        debug: true
                    },
                    transform: [
                        ['babelify', {
                            presets: ['es2015']
                        }]
                    ]
                },
                files: {
                    'dist/imagine.js': ['src/imagine.js']
                }
            },

            dist: {
                options: {
                    browserifyOptions: {
                        debug: false
                    },
                    transform: [
                        ['babelify', {
                            presets: ['es2015']
                        }]
                    ]
                },
                files: {
                    'dist/imagine.js': ['src/imagine.js']
                }
            }
        },

        uglify: {
            my_target: {
                files: {
                    'dist/imagine.min.js': ['dist/imagine.js']
                }
            }
        }

    });

    // Load plugins here
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');

    // Define your tasks here
    grunt.registerTask('default', [
        'clean',
        'browserify:dev',
        'test'
    ]);

    grunt.registerTask('prod', [
        'clean',
        'browserify:dist',
        'uglify'
    ]);

    grunt.registerTask('test', [
        'jshint',
        'qunit'
    ]);

};