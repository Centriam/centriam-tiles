import {bindMethods, ComponentClass, deepFreeze} from 'src/utils';


const _tileConfigMap = new Map();


export default deepFreeze(bindMethods({
    register(component) {
        this.addComponent(component.name, component);
        return component;
    },

    addComponent(name, component) {
        _tileConfigMap.set(name, component);
    },

    get(name) {
        return _tileConfigMap.get(name);
    },

    has(name) {
        return _tileConfigMap.has(name)
    },
}));
