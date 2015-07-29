'use strict';

var config  = require('../config');
var http    = require('http');
var express = require('express');
var gulp    = require('gulp');
var gutil   = require('gulp-util');
var morgan  = require('morgan');
var fs      = require('fs');
var path    = require('path');

gulp.task('server', function() {

    var server = express();

    // Log all requests to the console
    server.use(morgan('dev'));

    // Append .html to requests for existing html pages (/about -> /about.html)
    server.use(function(req, res, next) {
        if (req.path.indexOf('.') === -1) {
            var file = path.join(config.dist.root, req.path + '.html');
            fs.exists(file, function(exists) {
                if (exists) {
                    req.url += '.html';
                }
                next();
            });
        } else {
            next();
        }
    });
 
    // Serve static files
    server.use(express.static(config.dist.root));

    // Catch-all: send 404.html
    server.use(function(req, res) {
        res.status(404).sendFile('404.html', { root: config.dist.root });
    });

    // Start webserver if not already running
    var s = http.createServer(server);
    s.on('error', function(err) {
        if (err.code === 'EADDRINUSE') {
            gutil.log('Development server is already started at port ' + config.serverport);
        } else {
            throw err;
        }
    });

    s.listen(config.serverport);

});
