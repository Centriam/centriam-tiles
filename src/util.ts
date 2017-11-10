import * as React from 'react';


export type ComponentClass = new() => React.Component<any, any>;


export function isDefined<T>(value: T|undefined): value is T {
    return !!value;
}

export function deepFreeze<T extends {[key: string]: any}>(thing: T): T {
    Object.freeze(thing);
    for (let key of Object.keys(thing)) {
        if (typeof thing[key] === 'object') {
            deepFreeze(thing[key]);
        }
    }
    return thing;
}

export function bindMethods<T extends {[key: string]: any}>(thing: T): T {
    for (let key of Object.keys(thing)) {
        if (typeof thing[key] === 'function') {
            thing[key] = thing[key].bind(thing);
        }
    }
    return thing;
}
