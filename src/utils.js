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


function successFunc(src, val, valid, defaulted){
    if(typeof valid === 'function' && isDefined(src[val])){
        return new valid(src[val]);
    } else {
        return isDefined(src[val]) ? src[val] : defaulted;
    }
}

/***
 * this is a much lighter version of something we've used in another application
 * it also works both ways, both for setting and getting values. I made this because
 * I was hoping to avoid filling the constructor with a lot of conditionals. Not sure
 * I succeeded on that.
 * @param {} src the source object we want to check against
 * @param {[String] | String} keyOptions what we want to check for an existence of. Can be an array of different params
 *          e.g ['keyValue', 'key_value'] if your value can be one of multiple options.
 * @param valid what to return if it's valid. can be a function that takes the first object as a parameter.
 *          If left null, just returns the value as it is.
 * @param defaulted what to return if the first object doesn't exist
 * @return {*} the final result
 */
export function valueOrDefault(src, keyOptions, valid, defaulted){
    if(!!src){ // if we have our source object
        if(Array.isArray(keyOptions)){//check if you passed in
            let keys = keyOptions.filter(function(opt){return opt in src});
            //If we have two keys, throw error. This can't handle that
            if(keys.length >2){ throw new Error("Found multiple options for keys in object: " + src + " keys:" + keys)}
            else if(!!keys[0]){//If there is a value at index 0
                return successFunc(src, keys[0], valid, defaulted);
            }else{//no value, return default
                return defaulted;
            }
        } else if(typeof keyOptions === "string"){
            if(keyOptions in src){
                return successFunc(src, keyOptions, valid, defaulted);
            } else {
                return defaulted
            }
        }
    } else {
        return defaulted;
    }
}

export function isDefined(variable){
    if (typeof variable === 'undefined' || variable === null || (typeof variable === 'string' && variable === '')) {
        return false;
    }
    return true;
}

export function getWrappedComponent(component) {
    while (component.wrapped) {
        component = component.wrapped;
    }
    return component;
}
