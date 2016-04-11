'use strict';
const path = require('path');
const utils = require('./utils/utils');
const parser = require('raml-1-parser');

let generate = function(model, ramlfile, dirname, ajgenesis) {

    let projectName = "test";
    let tmpdirname = path.join(dirname);
    let source = path.resolve(path.join(__dirname));

    utils.files.createDirectory(tmpdirname, function() {
        model.builddir = dirname;
        model.names = utils.names;

        if (!model.project)
            model.project = { name: projectName, version: '0.0.1' };
        
        var pos = ramlfile.indexOf(':');
        if (pos > 0)
            ramlfile = ramlfile.substring(pos + 1);


         let ramlFilePath = path.resolve(ramlfile);

          parser.loadApi(ramlFilePath)
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

                ajgenesis.fileTransform(path.join(__dirname, 'templates', 'app.js.tpl'), path.join(builddir, 'app.js'), model);
                ajgenesis.fileTransform(path.join(__dirname, 'templates', 'package.json.tpl'), path.join(builddir, 'package.json'), model);
                ajgenesis.fileTransform(path.join(__dirname, 'templates', 'bin', 'www.tpl'), path.join(bindir, 'www'), model);

                raml.resources().forEach(function(resource) {
                    model.resource = resource;
                    var uri = resource.relativeUri().value();
                    ajgenesis.fileTransform(path.join(__dirname, 'templates', 'controllers', 'resource.js.tpl'), path.join(controllersdir, uri.substring(1) + '.js'), model);
                    ajgenesis.fileTransform(path.join(__dirname, 'templates', 'routes', 'resource.js.tpl'), path.join(routesdir, uri.substring(1) + '.js'), model);
                    delete model.resource;
                });

                return;
            })
            .catch( error => console.log(error));
    });


}

module.exports = (model, ramlfile, dirname, ajgenesis) => generate(model, ramlfile, dirname, ajgenesis);
