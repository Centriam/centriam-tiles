import * as React from 'react';


export function deepFreeze(thing) {
    Object.freeze(thing);
    for (let key of Object.keys(thing)) {
        if (typeof thing[key] === 'object') {
            deepFreeze(thing[key]);
        }
    }
    return thing;
}

export function bindMethods(thing) {
    for (let key of Object.keys(thing)) {
        if (typeof thing[key] === 'function') {
            thing[key] = thing[key].bind(thing);
        }
    }
    return thing;
}
