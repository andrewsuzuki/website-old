'use strict';

var config          = require('../config');
var gulp            = require('gulp');
var gulpif          = require('gulp-if');
var frontMatter     = require('gulp-front-matter');
var markdown        = require('gulp-markdown');
var render          = require('../plugins/render');
var handleErrors    = require('../util/handleErrors');
var browserSync     = require('browser-sync');

// Content task
gulp.task('content', function() {

    return gulp.src(config.content.src)

        // Extract/remove front matter data from page/post
        .pipe(frontMatter({ 
            property: 'frontMatter',
            remove: true // remove front matter from contents
        }))

        // Render our markdown
        .pipe(markdown())

        // Render ejs template with data and insert rendered markdown
        // (see file gulp/plugins/render.js)
        .pipe(render())

        .on('error', handleErrors)

        // Pipe to build destination
        .pipe(gulp.dest(config.content.dest))

        // Reload BrowserSync
        .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));

});
