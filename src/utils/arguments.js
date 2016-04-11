'use strict';

let cleanArguments = function(args) {
    if (args.length < 3)
        throw new Error(`Params expected`);
    return args.slice(2);
}

module.exports = {
    cleanArguments: cleanArguments,
}

