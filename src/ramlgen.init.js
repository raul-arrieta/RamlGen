'use strict';

const ajgenesis = require('ajgenesis');
const generate = require('./ramlgen.generate');
const utils = require('./utils/utils');
let model = ajgenesis.loadModel('./ramlgen/models');

let init = function(args) {
    args = utils.arguments.cleanArguments(args);
    switch (utils.arguments.getFirstArgument(args)) {
        case utils.arguments.generate():
            return generate(model, args[1], args[2], ajgenesis);
        default:
            throw new Error(`Unknown param.`);
    }
};

module.exports = (args) => init(args);