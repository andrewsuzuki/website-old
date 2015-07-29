'use strict';

var path = require('path');

module.exports = function (data) {
    data.filename = 'app/partials/post.ejs';

    data.dirname = path.join('blog', path.dirname(data.permalink));
    data.basename = path.basename(data.permalink);

    data.activeOn = function(str) {
        if (str === 'blog:' + data.permalink) {
            return ' class="active"';
        } else {
            return '';
        }
    };
}
