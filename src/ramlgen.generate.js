'use strict';
const path = require('path');
const utils = require('./utils/utils');

let generate = function (model, filename, builddir, ajgenesis) {
    
    let source = path.resolve(path.join(__dirname));
    
    model.builddir = builddir;
    model.names = utils.names;

    if (!model.project) {
        //var prjname = { project: { name: source, version: '0.0.1' } };
        var prjname = path.resolve(path.join(model.builddir, 'tmp', 'models', 'project.json'));
        model.project = require(prjname).project;
    }

    
    var pos = filename.indexOf(':');
    if (pos > 0)
        filename = filename.substring(pos + 1);

    ajgenesis.loadRamlFile(filename)
        .then(function(raml) {
            utils.resources.complete(raml);
            model.raml = raml;

            var builddir = model.builddir;
            var controllersdir = path.join(builddir, 'controllers');
            var routesdir = path.join(builddir, 'routes');
            var bindir = path.join(builddir, 'bin');

            ajgenesis.createDirectory(controllersdir);
            ajgenesis.createDirectory(routesdir);
            ajgenesis.createDirectory(bindir);

            ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'app.js.tpl'), path.join(builddir, 'app.js'), model);
            ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'package.json.tpl'), path.join(builddir, 'package.json'), model);
            ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'bin', 'www.tpl'), path.join(bindir, 'www'), model);

            raml.resources.forEach(function(resource) {
                model.resource = resource;
                ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'controllers', 'resource.js.tpl'), path.join(controllersdir, resource.relativeUri.substring(1) + '.js'), model);
                ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'routes', 'resource.js.tpl'), path.join(routesdir, resource.relativeUri.substring(1) + '.js'), model);
                delete model.resource;
            });

            return;
        });
}

module.exports = (model, args, ajgenesis)  => generate(model, args, ajgenesis);
