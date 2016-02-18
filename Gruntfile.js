module.exports = function(grunt) {
    var packageJson = require('./package.json');

    grunt.initConfig({
        basename: packageJson.name,
        version: packageJson.version,
        homepage: packageJson.homepage,
        paths: {
            dest: 'dist',
            src: 'src'
        },
        concat: {
            js: {
                files: [{
                    src: '<%= paths.src %>/*.js',
                    dest: '<%= paths.dest %>/<%= basename %>.js'
                }]
            },
            css: {
                files: [{
                    src: '<%= paths.src %>/*.css',
                    dest: '<%= paths.dest %>/<%= basename %>.css'
                }]
            }
        },
        uglify: {
            build: {
                options: {
                    mangle: true,
                    compress: true
                },
                files: [{
                    src: '<%= paths.dest %>/<%= basename %>.js',
                    dest: '<%= paths.dest %>/<%= basename %>.min.js'
                }]
            }
        },
        cssmin: {
            build: {
                files: [{
                    src: '<%= paths.dest %>/<%= basename %>.css',
                    dest: '<%= paths.dest %>/<%= basename %>.min.css'
                }]
            }
        },
        umd_wrapper: {
            options: {
                template: './src/umd-template'
            },
            build: {
                files: [{
                    src: '<%= paths.src %>/module',
                    dest: '<%= paths.dest %>/<%= basename %>.js'
                }]
            }
        },
        doc: {
            build: {}
        }
    });

    grunt.registerMultiTask("doc", "build documentation", function() {
        var done = this.async(),
            exec = require('child_process').exec;

        grunt.log.writeln("doc: build documentation");

        try {
            var cmd = 'node_modules/.bin/jsdoc --explain src/popup.js | node_modules/.bin/dirtydocs util/README.md > README.md';
            exec(cmd, function(err, stdout, stderr) {
                if (err != null) {
                    grunt.log.error("doc: an error occurred " + err.message);
                    done(false);
                    return;
                }

                done();
            });
        } catch (e) {
            grunt.log.error("doc: an error occurred " + e.message);
            done(false);
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-umd-wrapper');

    grunt.registerTask("default", ['concat', 'umd_wrapper:build', 'uglify:build', 'cssmin:build', 'doc:build']);
};
