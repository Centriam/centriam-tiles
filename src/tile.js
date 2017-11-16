import * as React from 'react';
import { Component } from 'react';

import TileRegistry from "./TileRegistry";
import {ComponentClass, or} from './utils';
import {defaultStyles} from "./providers";


/**
 * Entry-point and lynch pin -- Resolves a tile configuration object into an implementing class
 */
export class TileFactory extends Component {
    render() {
        const Component = TileRegistry.get(this.props.config.type);
        if (Component) {
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

export class AbstractTile<Config, Data> extends Component {

    renderImpl(style) { throw new Error("Unimplemented abstract method"); }

    render() {
        const style = this.props.style || {};
        const moreStyles = this.props.moreStyles || {};
        if (this.props.card) {
            const combinedStyles = {
                ...(defaultStyles.card),
                ...(defaultStyles.container),
                ...style,
                ...moreStyles,
            };
            return (
                <div style={combinedStyles}>
                    {this.renderImpl({flexGrow: 1})}
                </div>
            );
        } else {
            const combinedStyles = {
                ...(moreStyles),
                ...(style),
            };
            return this.renderImpl(combinedStyles);
        }
    }
}


