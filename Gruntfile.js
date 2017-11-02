module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'node_modules/r-simditor/styles/', src: ['**'], dest: 'src/style/'}
                ],
            },
        },
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['copy']);
};