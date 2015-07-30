'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var aliases      = require('../plugins/aliases');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');
var path         = require('path');

// Github pages doesn't allow access to files like blog.html as /blog
// if there's a directory named /blog.
// This task moves files with such names to their same-basename
// directories and renames them to index.html if index.html doesn't
// already exist.

gulp.task('aliases', function (cb) {

    if (!config.moveAliasesInProduction) {
        cb();
        return;
    }

    return gulp.src(path.join(config.dist.root, '**/*.html'))
        .pipe(aliases())
        .on('error', handleErrors)
        .pipe(gulp.dest(config.dist.root))
        .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));

});
