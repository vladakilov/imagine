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
            },
            uses_defaults: [
                'Gruntfile.js',
                'src/**/*.js',
                'test/**/*.js',
                '!src/_start.js',
                '!src/_end.js'
            ]
        },

        requirejs: {
            compile: {
                options: {
                    name: 'imagine',
                    baseUrl: 'src',
                    include: ['../bower_components/almond/almond.js'],
                    wrap: {
                        startFile: 'src/_start.js',
                        endFile: 'src/_end.js'
                    },
                    optimize: 'uglify2',
                    preserveLicenseComments: false,
                    out: 'dist/imagine.min.js'
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

    // Define your tasks here
    grunt.registerTask('default', [
        'jshint',
        'qunit',
        'requirejs'
    ]);

    grunt.registerTask('test', [
        'jshint',
        'qunit'
    ]);

};