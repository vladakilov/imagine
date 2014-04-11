module.exports = function(grunt) {

    // Configuration goes here
    grunt.initConfig({

        clean: [
            'dist'
        ],

        connect: {
            server: {
                options: {
                    port: 9000
                }
            }
        },

        concat: {
            basic_and_extras: {
                files: {
                    'dist/canvas.js': 'src/**/*.js'
                }
            }
        },

        uglify: {
            my_target: {
                files: {
                    'dist/canvas.min.js': 'src/**/*.js'
                }
            }
        },

        qunit: {
            all: {
                options: {
                    urls: [
                        'http://localhost:9000/test/qunit.html'
                    ]
                }
            }
        }

    });

    // Load plugins here
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Define your tasks here
    grunt.registerTask('default', [
        'connect',
        'qunit',
        'concat',
        'uglify'
    ]);

    grunt.registerTask('test', [
        'connect',
        'qunit'
    ]);

};