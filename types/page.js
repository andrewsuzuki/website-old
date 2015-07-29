'use strict';

var path = require('path');

function Page(data) {
    this.data = data;
    this.data.filename = 'app/partials/page.ejs';
    this.permalink();
}

Page.prototype.permalink = function() {
    this.data.dirname = path.dirname(this.data.permalink);
    this.data.basename = path.basename(this.data.permalink);
};

module.exports = Page;
