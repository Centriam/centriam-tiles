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
                    accessHash={this.props.accessHash}
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
        let {
            style={},
            moreStyles = {},
            accessHash,
            ...config,
        } = this.props;


        const combinedStyles = {
            ...(moreStyles),
            ...(style),
        };

        if (config.card) {


            let cardConfig = {
                card: false, //Do not card for eternity
                childConfig: {...config, card:false},
                configType: "CardContainerConfig",
                label: undefined,
                labelStyle: {},
                style: undefined,
                type: "CardContainer",
            };

            return (
                <TileFactory
                    config={cardConfig}
                    data={this.props.data}
                    style={combinedStyles}
                    accessHash={accessHash}
                />
            );
        } else {
            return this.renderImpl(combinedStyles);
        }
    }
}


