'use strict';
const fs = require('fs');
const path = require('path');

function createDirectory(pathAsArray, pathSoFar, cb) {
    if (!pathAsArray || pathAsArray.length === 0) {
        cb();
        return;
    }

    var dir = pathAsArray.shift();
    pathSoFar = pathSoFar + dir + path.sep;
    fs.access(pathSoFar, function(error) {
        if (error) { // directory does not exist
            fs.mkdir(pathSoFar, function(error) {
                if (!error) {
                    createDirectory(pathAsArray, pathSoFar, cb);
                }
            });
        } else {
            createDirectory(pathAsArray, pathSoFar, cb);
        }
    });
}

let createDirectoryRecursive = function(directory, cb) {
    var pathAsArray = directory.split(path.sep);
    createDirectory(pathAsArray,'', cb);
};

module.exports = {
    createDirectory: createDirectoryRecursive,
}

