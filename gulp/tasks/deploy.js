'use strict';

var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var path = require('path');
var config = require('../config');

gulp.task('deploy', ['prod'], function() {
    return gulp.src(path.join(config.dist.root, '**/*'))
        .pipe(ghPages(config.ghPages));
});
