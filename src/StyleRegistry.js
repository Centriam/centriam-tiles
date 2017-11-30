/**
 * Styles are organized into a 2-level tree:
 *  - Component -> Subcomponent -> Style
 *
 * Component names act as a namespace, and subcomponents are the names of individual elements.
 *
 * Each style has a "default" provided by the library and an "override" provided by the library user.
 * Finally, one or more additional overrides may be provided when a style is resolved.
 */

import {bindMethods, ComponentClass, deepFreeze} from './utils';
import {Style} from "./tile";

const styleSettings = deepFreeze({
    hPadding: '2em',
    vPadding: '2em',
    fontFamily: '"Nunito Sans",sans-serif',
    fontSize: '13px',
    shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
});



/**
 * Internal utility class to store data about a single stylesheet
 */
class Stylesheet {
    constructor(defaultStyle) {
        this._default = defaultStyle;
        this._override = null;
    }

    set override (_) {
        this._override = _;
    }

    resolve(...overrides) {
        return Object.assign({}, this._default, this._override, ...overrides);
    }
}

const stylesheets = new Map();

function resolveStylesheet(
    componentName,
    subComponentName,
) {
    let componentStyles;
    if (!stylesheets.has(componentName)) {
        componentStyles = new Map();
        stylesheets.set(componentName, componentStyles);
    }

    let stylesheet;
    if (!componentStyles.has(componentName)) {
        stylesheet = {};
        componentStyles.set(componentName, stylesheet);
    }
}

export default deepFreeze(bindMethods({
    defineStylesheet(
        componentName,
        subComponentName,
        defaultStylesheet,
    ) {
        const componentStyles = stylesheets.get(componentName);
        if (componentStyles === undefined) {
            const componentStyles = new Map();
            stylesheets.set(componentName, componentStyles);
            componentStyles.set(subComponentName, new Stylesheet(defaultStylesheet));
        } else if (componentStyles.has(subComponentName)) {
            throw new Error(`Stylesheet ${componentName} > ${subComponentName} is already defined`);
        } else {
            componentStyles.set(subComponentName, new Stylesheet(defaultStylesheet));
        }

        return defaultStylesheet;
    },

    getStylesheet(
        componentName,
        subComponentName,
        ...overrides,
    ) {
        let componentStyles;
        if (!stylesheets.has(componentName)) {
            componentStyles = new Map();
            stylesheets.set(componentName, componentStyles);
        }

        let stylesheet;
        if (!componentStyles.has(componentName)) {
            stylesheet = {};
            componentStyles.set(componentName, stylesheet);
        }
        return Object.assign({}, resolveStylesheet(componentName, subComponentName), ...overrides);
    },
}))

