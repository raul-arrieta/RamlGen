'use strict';

let getName = function (name) {
    if (!name)
        return name;

    if (name[0] == '/')
        name = name.substring(1);

    let l = name.length;

    if (!l)
        return name;

    let lastch = name[l - 1];

    if (lastch == 's') {
        if (l > 3 && name[l - 3] == 'i' && name[l - 2] == 'e')
            name = name.substring(0, l - 3) + 'y';
        else
            name = name.substring(0, l - 1);
    }

    return name;
}

let getSetName = function (name) {
    name = getName(name);

    if (name.length)
        if (name[name.length - 1] == 'y')
            name = name.substring(0, name.length - 1) + 'ies';
        else if (name[name.length - 1] != 's')
            name = name + 's';

    return name;
}

let capitalize = (name) => name[0].toUpperCase() + name.substring(1);

module.exports = {
    getName: getName,
    getSetName: getSetName,
    capitalize: capitalize
}

