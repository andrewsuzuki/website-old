'use strict';

module.exports = {

    'browserport'  : 3000,
    'uiport'       : 3001,
    'serverport'   : 3002,

    'styles': {
        'src' : ['app/styles/**/*.scss'],
        'dest': 'build/css',
        'concat': 'main.css'
    },

    'scripts': {
        'src' : 'app/js/**/*.js',
        'dest': 'build/js'
    },

    'images': {
        'src' : 'app/images/**/*',
        'dest': 'build/images'
    },

    'fonts': {
        'src' : ['app/fonts/**/*'],
        'dest': 'build/fonts'
    },

    'views': {
        'watch': [
            'app/views/**/*.html'
        ],
        'src': 'app/views/**/*.html',
        'dest': 'build'
    },

    'gzip': {
        'src': 'build/**/*.{html,xml,json,css,js,js.map}',
        'dest': 'build/',
        'options': {}
    },
    
    'dist': {
        'root': 'build'
    },
    
    'ghPages': {
        'branch': 'master'
    },

    'browserify': {
        'entries'   : ['./app/js/main.js'],
        'bundleName': 'main.js',
        'sourcemap' : true
    },

    'test': {
        'karma': 'test/karma.conf.js',
        'protractor': 'test/protractor.conf.js'
    }

};
