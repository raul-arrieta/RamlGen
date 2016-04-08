'use strict';

let cleanArguments = function(args) {
    if (args.length < 3)
        throw new Error(`Params expected`);
    return args.slice(2);
}

let getFirstArgument = function (args) {
    return args[0].toLowerCase();
}

let createParam = function (params) { return "create"; }
let generateParam = function (params) { return "generate"; }

module.exports = {
    create: createParam,
    generate: generateParam,
    cleanArguments: cleanArguments,
    getFirstArgument: getFirstArgument,
}

