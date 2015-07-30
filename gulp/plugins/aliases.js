var config          = require('../config');
var gutil           = require('gulp-util');
var through         = require('through2');
var fs              = require('fs');
var path            = require('path');
var del             = require('del');

var pluginName = 'aliases'; // TODO change this when it becomes a module

module.exports = function() {
    return through.obj(function(file, enc, cb) {
        var name = path.join(path.dirname(file.relative), path.basename(file.relative, '.html'));
        var possibleDir = path.resolve(config.dist.root, name);
        var stat;

        try {
            stat = fs.lstatSync(possibleDir);
        } catch (e) {
            stat = null;
        }

        if (stat && stat.isDirectory()) {
            // Check if index.html already exists
            try {
                stat = fs.lstatSync(path.join(possibleDir, 'index.html'));
            } catch (e) {
                stat = null;
            }
            if (!stat || !stat.isFile()) {
                // Delete old file
                del.sync([file.path]);
                // Copy to directory and rename to index.html
                file.path = path.join(possibleDir, 'index.html');
            }
        }

        this.push(file);

        cb();
    });
};
