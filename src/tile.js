import * as React from 'react';
import { Component } from 'react';
import { validate } from 'jsonschema';

import TileRegistry from "./TileRegistry";
import {ComponentClass, getWrappedComponent, isDefined, or} from './utils';


/**
 * Entry-point and lynch pin -- Resolves a tile configuration object into an implementing class
 */
export class TileFactory extends Component {
    render() {
        if (!isDefined(this.props.config.type)) {
            throw new Error('Tile type is not defined');
        }

        const Component = TileRegistry.get(this.props.config.type);

        if (Component) {
            // Validate configuration before rendering component
            const wrappedComponent = getWrappedComponent(Component);
            if (isDefined(wrappedComponent.CONFIG_SCHEMA)) {
                validate(this.props.config, wrappedComponent.CONFIG_SCHEMA, {throwError: true});
            }

            return (
                <Component
                    {...this.props.config}
                    data={this.props.data}
                    moreStyles={this.props.style}
                />
            );
        } else {
            throw new Error(`Tile of type ${this.props.config.type} is not registered`)
        }
    }
}

export class AbstractTile extends Component {

    renderImpl(style) {
        throw new Error("Unimplemented abstract method");
    }

    render() {
        let {
            style={},
            moreStyles = {},
            ...config,
        } = this.props;


        const combinedStyles = {
            ...(moreStyles),
            ...(style),
        };

        if (config.card) {
            return (
                <TileFactory data={this.props.data} config={{
                    type: 'CardContainer',
                    childConfig: {...config, card:false},
                    style: combinedStyles,
                }} />
            );
        } else {
            return this.renderImpl(combinedStyles);
        }
    }

    static CONFIG_SCHEMA = {
        type: 'object',
    };

    /**
     * Helper to build and validate a configuration object
     * @param {Object} config
     */
    static config(config) {

        const ret = {
            ...config,
            type: this.name,
        };

        if (this.CONFIG_SCHEMA) {
            validate(ret, this.CONFIG_SCHEMA, {throwError: true});
        }

        return ret;
    }
}



