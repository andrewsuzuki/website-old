'use strict';

var config = require('../config');
var path   = require('path');

module.exports = function(typeName) {
    var Type;

    try {
        Type = require(path.join('../../', config.types.src, typeName));
    } catch(e) {
        Type = null;
    }

    return Type;
};
