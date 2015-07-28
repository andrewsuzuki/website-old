'use strict';

var config         = require('../config');
var gulp           = require('gulp');
var gulpif         = require('gulp-if');
var rename         = require('gulp-rename');
var tap            = require('gulp-tap');
var frontMatter    = require('gulp-front-matter');
var markdown       = require('gulp-markdown');
var fs             = require('fs');
var ejs            = require('ejs');
var browserSync    = require('browser-sync');

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
        .pipe(tap(function(file) {
            // TODO: some sort of checking here
            var templateFilename = config.templates[file.frontMatter.type];

            var data = {
                // EJS options
                filename: templateFilename,
                // Template data
                pageTitle: file.frontMatter.title,
                content: file.contents.toString() // rendered markdown as str
            };

            // Get template file
            var template = fs.readFileSync(templateFilename, { encoding: 'utf8' });
            // Render template with data
            var rendered = ejs.render(template, data);

            // Replace file contents with rendered template
            file.contents = new Buffer(rendered);
        }))

        // Change file dirname / extension
        .pipe(rename(function(path) {
            path.dirname = ''; // flatten for now
            path.extname = '.html';
            // path.basename = path.basename;
        }))

        // Pipe to build destination
        .pipe(gulp.dest(config.content.dest))

        // Reload BrowserSync
        .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));

});
