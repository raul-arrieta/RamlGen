'use strict';

const ajgenesis = require('ajgenesis');
const parser = require('raml-parser');
const path = require('path');
const create = require('./ramlgen.create');
const generate = require('./ramlgen.generate');
const utils = require('./utils/utils');

let init = function(args) {
    var model = ajgenesis.loadModel('./ramlgen/models');
    args = utils.arguments.cleanArguments(args);
    switch (utils.arguments.getFirstArgument(args)) {
        case utils.arguments.create():
            return create(model,args[1], ajgenesis);
        case utils.arguments.generate():
            return generate(model, args[1], path.resolve(args[2]), ajgenesis);
        default:
            throw new Error(`Unknown param.`);
    }
};

module.exports = (args) => init(args);