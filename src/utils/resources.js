'use strict';

const names = require('./names');

let complete = function(obj, prefix) {
    if (!prefix)
        prefix = '';

    if (!obj || !obj.resources() || !obj.resources().length)
        return;

    obj.resources().forEach(function(resource) {
        completeResource(resource, prefix);
    });
}

let completeResource = function(resource, prefix) {
    resource.entity = {};

    var name = names.getName(resource.relativeUri().value());
    
    console.log(`----------------------------------`);
    console.log(`resource -> ${name}`);
    
    if (name) {
        if (name[0] == '{') {
            name = name.substring(1, name.length - 1);
            resource.entity.name = names.getName(name);
            resource.entity.setname = names.getSetName(name);
            resource.entity.title = 'With' + names.capitalize(name);
            resource.entity.settitle = 'With' + names.capitalize(name);
        }
        else {
            resource.entity.name = names.getName(name);
            resource.entity.setname = names.getSetName(name);
            resource.entity.title = names.capitalize(name);
            resource.entity.settitle = names.capitalize(names.getSetName(name));
        }
    }

    if (resource.methods())
        console.log(`   parsing methods [${resource.methods().length}]...`);
        resource.methods().forEach(function(method) {
            method.fn = {};
            
            if (method.method() == 'get' && prefix == '')
                method.fn.name = method.method() + prefix + resource.entity.settitle;
            else
                method.fn.name = method.method() + prefix + resource.entity.title;
            
            console.log(`       method -> ${method.methodId()} -> ${method.fn.name}`);
            console.log(`       parsing responses [${method.responses().length}]...`);
            method.responses().forEach(function (response) {
                console.log(`           response -> ${response.code().value()}`);
                var code = response.code().value();
                if (response.code().value() == '200' && response.body().length > 0) {
                var body = response.body()[0];

                if (body.example() && body.example().value())
                        method.fn.example = body.example().value();
            }
            });

            
        });

    if (resource.resources())
        resource.resources().forEach(function(subresource) {
            completeResource(subresource, prefix + resource.entity.title);
        });
}

module.exports = {
    complete: complete
};

