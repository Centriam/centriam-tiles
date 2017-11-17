import {ComponentClass, deepFreeze} from './utils';

/*
    Providers:
    - TileFactory registry (associate name with tile component)
    - Cell registry (associate name with component subclassing CentriamTableCell)
    - Stylesheet registry (configure and source global styles once for an application)
 */


export const styleSettings = deepFreeze({
    hPadding: '2em',
    vPadding: '2em',
    fontFamily: '"Nunito Sans",sans-serif',
    fontSize: '13px',
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
        get fontFamily() { return styleSettings.fontFamily; },
        get fontSize() { return styleSettings.fontSize; },
    },
    container: {
        display: 'flex',
        get fontFamily() { return styleSettings.fontFamily; },
        get fontSize() { return styleSettings.fontSize; },
    },
    containerHorizontalWrapper: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        get marginLeft() { return `calc(-${styleSettings.hPadding}/2)`; },
        get marginRight() { return `calc(-${styleSettings.hPadding}/2)`; },
        get fontFamily() { return styleSettings.fontFamily; },
        get fontSize() { return styleSettings.fontSize; },
    },
    containerHorizontalChild: {
        flexGrow: 1,
        flexBasis: 0,
        get marginLeft() { return `calc(${styleSettings.hPadding}/2)`; },
        get marginRight() { return `calc(${styleSettings.hPadding}/2)`; },
        get fontFamily() { return styleSettings.fontFamily; },
        get fontSize() { return styleSettings.fontSize; },
    },
    containerVerticalWrapper: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        get marginTop() { return `calc(-${styleSettings.vPadding}/2)`; },
        get marginBottom() { return `calc(-${styleSettings.vPadding}/2)`; },
        get fontFamily() { return styleSettings.fontFamily; },
        get fontSize() { return styleSettings.fontSize; },
    },
    containerVerticalChild: {
        flexGrow: 1,
        flexBasis: 0,
        get marginTop() { return `calc(${styleSettings.vPadding}/2)`; },
        get marginBottom() { return `calc(${styleSettings.vPadding}/2)`; },
        get fontFamily() { return styleSettings.fontFamily; },
        get fontSize() { return styleSettings.fontSize; },
    },
    numberOverNumber: {
        containerStyle: {
            get fontFamily() { return styleSettings.fontFamily; },
            get fontSize() { return styleSettings.fontSize; },
            fontWeight: 600,
        },
        header1Style: {
            color: '#999',
        },
        value1Style: {
            fontSize: '2.5em',
            color: 'black',
        },
        header2Style: {
            color: '#999',
            marginTop: '0.75em',
        },
        value2Style: {
            fontSize: '1.5em',
            color: '#14cb5b',
        },
    },
    npsSummary: {
        containerStyle: {
            get fontFamily() { return styleSettings.fontFamily; },
            get fontSize() { return styleSettings.fontSize; },
            fontWeight: 600,
        },
        headerStyle: {
            textTransform: 'uppercase',
        },
        sectionHeaderStyle: {
            // nothing
        },
        majorValueStyle: {
            fontSize: '2.5em',
        },
        minorValueStyle: {
            fontSize: '1.5em',
        },
    },
});
//
