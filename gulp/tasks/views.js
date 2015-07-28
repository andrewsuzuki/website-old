'use strict';

var config         = require('../config');
var gulp           = require('gulp');
var gulpif         = require('gulp-if');
var preprocess     = require('gulp-preprocess'); // probably not necessary
var browserSync    = require('browser-sync');

// Views task
gulp.task('views', function() {

    // Process any view files from app/views
    return gulp.src(config.views.src)
        .pipe(gulp.dest(config.views.dest))
        .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));

});
