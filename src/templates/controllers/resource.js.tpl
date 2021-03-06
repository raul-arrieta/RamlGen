
<#
var fns = [];

actions('', resource);

#>
module.exports = {
<#
    fns.forEach(function (fn) { #>
    ${fn}: ${fn},
<#
    });
#>
}
<#

function actions(prefix, resource) {
    if (resource.description() && resource.description().value()) { #>
// ${resource.description().value()}
<#        
    }
        
    resource.methods().forEach(function (method) {
        if (!method.fn)
            return;
    
        if (method.description() && method.description().value()) { #>
// ${method.description().value()}
<#        
        }
        
        var name = model.names.capitalize(model.names.getName(resource.relativeUri().value())); #>
function ${method.fn.name}(req, res) {
<#
    if (method.fn.example) { #>
    res.json(${method.fn.example});
<#
    }
    else {
#>
    res.end();
<#
    }
#>
}
<#
        fns.push(method.fn.name);
    });
    
    if (resource.resources() && resource.entity && resource.entity.title)
        resource.resources().forEach(function (subresource) {
            actions(prefix + resource.entity.title, subresource);
        });
}
#>
