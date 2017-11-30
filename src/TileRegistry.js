import { validate } from 'jsonschema';

import {bindMethods, ComponentClass, deepFreeze, getWrappedComponent} from './utils';
import metaschema from './metaschema';


const _tileComponentMap = new Map();


export default deepFreeze(bindMethods({
    register(component) {
        const wrappedComponent = getWrappedComponent(component);
        if (wrappedComponent.CONFIG_SCHEMA) {
            validate(wrappedComponent.CONFIG_SCHEMA, metaschema, {throwError: true});
        }

        this.addComponent(component.name, component);

        return component;
    },

    addComponent(name, component) {
        _tileComponentMap.set(name, component);
    },

    get(name) {
        return _tileComponentMap.get(name);
    },

    has(name) {
        return _tileComponentMap.has(name)
    },
}));
