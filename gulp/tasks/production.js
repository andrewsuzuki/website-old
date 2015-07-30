'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('prod', ['clean'], function(cb) {

    cb = cb || function() {};

    global.isProd = true;

    runSequence(['styles', 'images', 'fonts', 'root_files', 'browserify'], 'posts', 'content', 'aliases', 'gzip', cb);

});
