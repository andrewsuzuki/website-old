'use strict';

var config          = require('../config');
var gulp            = require('gulp');
var _               = require('lodash');

gulp.task('watch', ['browserSync', 'server'], function() {

    // Scripts are automatically watched and rebundled by Watchify inside Browserify task
    gulp.watch(config.scripts.src,    ['lint']);
    gulp.watch(config.styles.src,     ['styles']);
    gulp.watch(config.images.src,     ['images']);
    gulp.watch(config.fonts.src,      ['fonts']);
    gulp.watch(config.root_files.src, ['root_files']);
    // Watch both content and partials for content task
    gulp.watch(_.flattenDeep([config.content.src, config.partials.src]), ['content']);
    gulp.watch(_.flattenDeep([config.content.postSrc, config.partials.src]), ['posts']);

});
