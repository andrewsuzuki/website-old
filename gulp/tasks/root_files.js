'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');

gulp.task('root_files', function () {

  return gulp.src(config.root_files.src)
    .on('error', handleErrors)
    .pipe(gulp.dest(config.root_files.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));

});
