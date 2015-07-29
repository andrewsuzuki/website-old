'use strict';

var path = require('path');

module.exports = function (data) {
    data.filename = 'app/partials/page.ejs';

    data.dirname = path.dirname(data.permalink);
    data.basename = path.basename(data.permalink);
}
