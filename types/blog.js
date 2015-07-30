'use strict';

var _               = require('lodash');
var path            = require('path');
var fs              = require('fs');
var ejs             = require('ejs');
var postCollector   = require('../gulp/util/postCollector');

module.exports = function (data) {
    data.filename = 'app/partials/page.ejs';

    data.dirname = path.dirname(data.permalink);
    data.basename = path.basename(data.permalink);

    var postList = _.reduce(postCollector, function(content, postData) {
        // Get post stub template file
        var template = fs.readFileSync('app/partials/postStub.ejs', { encoding: 'utf8' });
        // Render post stub with post file data; add to sum
        return content + ejs.render(template, { 'post': postData });
    }, '');

    data.content = ejs.render(data.content, {
        'postList': postList,
        'delimiter': 'ejs'
    });
}
