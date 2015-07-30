'use strict';

module.exports = {

    'browserport'  : 3000,
    'uiport'       : 3001,
    'serverport'   : 3002,

    'moveAliasesInProduction': true,

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

    'partials': {
        'src': [
            'app/partials/**/*.html',
            'app/partials/**/*.ejs',
        ]
    },

    'content': {
        'postSrc': [
            'content/posts/**/*.md',
        ],
        'src': [
            'content/**/*.md',
            '!content/posts/**' // exclude posts
         ]
    },

    'types': {
        'src': 'types'
    },

    'templates': {
        'page': 'app/partials/page.ejs',
        'post': 'app/partials/post.ejs'
    },

    'root_files': {
        'src': 'app/root_files/**/*',
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
