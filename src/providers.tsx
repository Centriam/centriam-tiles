import {bindMethods, ComponentClass, deepFreeze} from './util';

/*
    Providers:
    - Tile registry (associate name with tile component)
    - Cell registry (associate name with component subclassing CentriamTableCell)
    - Stylesheet registry (configure and source global styles once for an application)
 */

const _tileComponentMap: Map<string, ComponentClass> = new Map<string, ComponentClass>();



export const TileRegistry = deepFreeze(bindMethods({
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

// export const TileRegistry = new Map();

export const styleSettings = deepFreeze({
    hPadding: '1em',
    vPadding: '1em',
    fontFamily: '"Nunito Sans",sans-serif',
    shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
});


export const defaultStyles = deepFreeze({
    general: {
        get fontFamily() { return styleSettings.fontFamily; },
    },
    card: {
        boxSizing: 'border-box',
        get padding() { return `${styleSettings.vPadding} ${styleSettings.hPadding}`; },
        borderColor: '#999999',
        borderWidth: '1px',
        borderStyle: 'solid',
    },
    container: {
        display: 'flex',
    },
    containerHorizontalWrapper: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        get marginLeft() { return `calc(-${styleSettings.hPadding}/2)`; },
        get marginRight() { return `calc(-${styleSettings.hPadding}/2)`; },
    },
    containerHorizontalChild: {
        flexGrow: 1,
        flexBasis: 0,
        get marginLeft() { return `calc(${styleSettings.hPadding}/2)`; },
        get marginRight() { return `calc(${styleSettings.hPadding}/2)`; },
    },
    containerVerticalWrapper: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        get marginTop() { return `calc(-${styleSettings.vPadding}/2)`; },
        get marginBottom() { return `calc(-${styleSettings.vPadding}/2)`; },
    },
    containerVerticalChild: {
        flexGrow: 1,
        flexBasis: 0,
        get marginTop() { return `calc(${styleSettings.vPadding}/2)`; },
        get marginBottom() { return `calc(${styleSettings.vPadding}/2)`; },
    },
});
