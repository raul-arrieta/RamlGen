'use strict';

const ajgenesis = require('ajgenesis');
const generate = require('./ramlgen.generate');
const utils = require('./utils/utils');
let model = ajgenesis.loadModel('./ramlgen/models');

let init = function(args) {
    return generate(model, args[2], args[3], ajgenesis);
};


module.exports = {
    init: init
}

