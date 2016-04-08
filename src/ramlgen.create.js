
'use strict';
const fs = require('fs');
const path = require('path');
const utils = require('./utils/utils');

let copyResources = function (source, dirname, model, ajgenesis) {
    let tmpdirname = path.join(dirname,'tmp');
    try {
        ajgenesis.copyDirectory(source, tmpdirname, function(err, result) {
            if (err)
                throw err;

            let projmodel;

            if (model.project)
                projmodel = model.project;
            else
                model.project = projmodel = { project: { name: dirname, version: '0.0.1' } };

            ajgenesis.saveModel(path.join(tmpdirname, 'models', 'project.json'), projmodel);

            return;
        });

    } catch (error) {
        throw error;
    }
}

let create = function(model, dirname, ajgenesis) {
    
    model = model || {};
    
    let tmpdirname = path.join(dirname,'tmp');
    let source = path.resolve(path.join(__dirname));
    utils.files.createDirectory(tmpdirname, function(error) { copyResources(source, dirname, model, ajgenesis) ;});
    
};

module.exports = (model, dirname, ajgenesis) => create(model, dirname, ajgenesis);
