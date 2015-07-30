'use strict';

var path            = require('path');
var postCollector   = require('../gulp/util/postCollector');

module.exports = function (data) {
    data.filename = 'app/partials/page.ejs';

    data.dirname = path.dirname(data.permalink);
    data.basename = path.basename(data.permalink);

    var content = '';

    postCollector.forEach(function(file) {
        content += file.data.title + '<br />';
    });

    data.content = content;
}
