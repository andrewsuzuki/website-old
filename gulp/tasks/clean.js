'use strict';

var config  = require('../config');
var gulp    = require('gulp');
var del     = require('del');

gulp.task('clean', function(cb) {

    // waiting for promises to be added to del
    del([config.dist.root], cb);
    
});
