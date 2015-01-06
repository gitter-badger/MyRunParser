module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    quiet: false,
                    require: 'test/common',
                    clearRequireCache: true
                },
                src: ['test/**/*.test.js']
            }
        },

        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5,
                title: 'My Run Parser',
                success: true,
                duration: 3
            }
        },

        watch: {
            js: {
                options: {
                    spawn: false
                },

                files: ['**/*.test.js', 'api/**/*.js'],
                tasks: ['mochaTest']
            }
        },
        shell: {
            mongo: {
                command: 'mongod'
            }
        }
    });

    grunt.registerTask('default', [
        'notify_hooks',
        'watch'
        ]);
};