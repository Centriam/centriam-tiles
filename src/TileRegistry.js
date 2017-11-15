import {bindMethods, ComponentClass, deepFreeze} from 'src/utils';


const _tileComponentMap = new Map();


export default deepFreeze(bindMethods({
    register(component) {
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
