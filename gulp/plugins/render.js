var gutil           = require('gulp-util');
var through         = require('through2');
var getType         = require('../util/getType');
var postCollector   = require('../util/postCollector');
var config          = require('../config');
var merge           = require('merge');
var fs              = require('fs');
var path            = require('path');
var ejs             = require('ejs');
var moment          = require('moment');

var pluginName = 'render'; // TODO change this when it becomes a module

module.exports = function(isPosts) {
    return through.obj(function(file, enc, cb) {
        if (!file.frontMatter || Object.getOwnPropertyNames(file.frontMatter).length === 0) {
            cb(new gutil.PluginError(pluginName, 'File "' + file.relative + '" does not have required front matter.'));
            return;
        }
        var typeName = file.frontMatter.type;
        if (!typeName) {
            cb(new gutil.PluginError(pluginName, 'Content type was not set in file "' + file.relative + '".'));
            return;
        }
        var Type = getType(typeName);
        if (!Type) {
            cb(new gutil.PluginError(pluginName, 'Could not find content type "' + typeName+ '" in file "' + file.relative + '".'));
            return;
        }

        // Various data for both type and template
        var data = {};

        // EJS options
        data.filename = ''; // to be filled by Type

        // File info
        data.extname = path.extname(file.relative);
        data.dirname = path.dirname(file.relative);
        data.basename = path.basename(file.relative, data.extname);

        // Add in supplied front matter to data
        data = merge(data, file.frontMatter);

        // Include the page content
        data.content = file.contents.toString();

        // Other template data
        data.rawDate = data.date;
        if (data.rawDate) {
            data.date = moment(data.date);
        }

        data.thisYear = new Date().getFullYear();

        // Functions
        data.activeOn = function(str) {
            if (str === this.permalink) {
                return ' class="active"';
            } else {
                return '';
            }
        };
        data.renderContent = function() {
            // Get template file
            var template = fs.readFileSync(this.filename, { encoding: 'utf8' });
            // Render template with data
            return ejs.render(template, data);
        };
        data.formatDate = function(moment) {
            return moment.format(config.dateFormat);
        };
        data.formatDateShort = function(moment) {
            return moment.format(config.dateFormatShort);
        };
        data.url = function() {
            return '/' + this.permalink;
        };

        // Use Type on data
        try {
            Type(data);
        } catch (e) {
            cb(new gutil.PluginError(pluginName, 'Could not use content type "' + typeName + '" on file "' + file.relative + '" -- ' + e + '.'));
            return;
        }

        // Force .html extension
        data.extname = '.html';
        // Make final relative path
        data.relative = path.join(data.dirname, data.basename + data.extname);
        // Set file's new absolute path
        file.path = path.join(file.base, data.relative);

        // Replace file contents with rendered template
        try {
            file.contents = new Buffer(data.renderContent());

            // Keep in stream
            this.push(file);

            // Add data to postCollector if this is a post
            if (isPosts) {
                postCollector.push(data);
            }
        } catch (e) {
            this.emit('error', new gutil.PluginError(pluginName, e));
        }

        cb();
    });
};
