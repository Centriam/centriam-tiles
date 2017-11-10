import * as React from 'react';

import { TileRegistry } from "./providers";
import {ComponentClass} from './util';

export type Style = { [key: string]: any };
export interface TileConfig {
    type: string,
    [key: string]: any,
}
export interface TileProps {
    config: TileConfig,
    data: any,
    style?: Style,
}


/**
 * Entry-point and lynch pin -- Resolves a tile configuration object into an implementing class
 */
export class Tile extends React.Component <TileProps> {
    render() {
        const Component = TileRegistry.get(this.props.config.type) as ComponentClass;
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

