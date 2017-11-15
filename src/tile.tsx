import * as React from 'react';

import TileRegistry from "src/TileRegistry";
import {ComponentClass, or} from 'src/utils';
import {defaultStyles} from "./providers";

export type Style = { [key: string]: any };
export interface TileConfig {
    type: string,
    card?: boolean,
    [key: string]: any,
}
export interface TileProps {
    config: TileConfig,
    data: any,
    style?: Style,
}

//export type TileImplProps<Config, Data> =
export type AbstractTileProps<Data> = {
    card?: boolean,
    data: Data,
    style?: Style,
    moreStyles?: Style,
}


/**
 * Entry-point and lynch pin -- Resolves a tile configuration object into an implementing class
 */
export class TileFactory extends React.Component <TileProps> {
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

export abstract class AbstractTile<Config, Data> extends React.Component<Config & AbstractTileProps<Data>> {

    abstract renderImpl(style: Style): JSX.Element|React.Component;

    render() {
        const style: Style = or<Style>(this.props.style, {});
        const moreStyles: Style = or<Style>(this.props.moreStyles, {});
        if (this.props.card) {
            const combinedStyles = {
                ...(defaultStyles.card),
                ...(defaultStyles.container),
                ...style,
                ...moreStyles,
            } as Style;
            return (
                <div style={combinedStyles}>
                    {this.renderImpl({flexGrow: 1})}
                </div>
            );
        } else {
            const combinedStyles = {
                ...(moreStyles),
                ...(style),
            } as Style;
            return this.renderImpl(combinedStyles);
        }
    }
}


