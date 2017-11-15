import {bindMethods, ComponentClass, deepFreeze} from 'src/utils';


const _tileComponentMap: Map<string, ComponentClass> = new Map<string, ComponentClass>();


export default deepFreeze(bindMethods({
    register<P, S, C extends React.Component<P, S>>(component: new() => C): new() => C {
        this.addComponent(component.name, component);
        return component;
    },

    addComponent(name: string, component: ComponentClass) {
        _tileComponentMap.set(name, component);
    },

    get(name: string): (ComponentClass | undefined) {
        return _tileComponentMap.get(name);
    },

    has(name: string): boolean {
        return _tileComponentMap.has(name)
    },
}));
