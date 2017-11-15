import * as React from 'react';

import {defaultStyles, styleSettings} from 'src/providers';
import TileRegistry from 'src/TileRegistry';
import {AbstractTile, Style, TileFactory, TileConfig} from 'src/tile';




interface GenericTileConfig {
    // type: string,
    card?: boolean,
    style?: Style,
}

enum FlexDirection {
    HORIZONTAL = 'HORIZONTAL',
    VERTICAL = 'VERTICAL',
}

interface CardConfig extends GenericTileConfig {
    childConfig: TileConfig,
}

interface FixedContainerConfig extends GenericTileConfig {
    direction: FlexDirection,
    childConfigs: TileConfig[], // This was going to be "children", but that's already a special property in React
}

interface VariableContainerConfig extends GenericTileConfig {
    direction: FlexDirection,
    childConfig: TileConfig[], // This was going to be "children", but that's already a special property in React
}

@TileRegistry.register
class Card extends AbstractTile<CardConfig, any[]> {
    renderImpl(style: Style){ return <div />; } // unused

    render() {
        const combinedStyles: Style = {
            ...(defaultStyles.card),
            ...(defaultStyles.container),
            ...(this.props.moreStyles),
            ...(this.props.style),
        };

        const childStyle: Style = {
            flexGrow: 1,
        };

        return (
            <div style={combinedStyles}>
                <TileFactory
                    config={this.props.childConfig}
                    data={this.props.data}
                    style={childStyle}
                />
            </div>
        );
    }
}

@TileRegistry.register
class FixedContainer extends AbstractTile<FixedContainerConfig, any[]> {
    renderImpl(style: Style) {
        const childWrapperStyle: Style = this.props.direction == FlexDirection.VERTICAL ?
            defaultStyles.containerVerticalWrapper :
            defaultStyles.containerHorizontalWrapper;

        const childStyle: Style = this.props.direction == FlexDirection.VERTICAL ?
            defaultStyles.containerVerticalChild :
            defaultStyles.containerHorizontalChild;

        return (
            <div style={style}>
                <div style={childWrapperStyle}>
                    {this.props.childConfigs.map((childConfig, index: number) =>
                        <TileFactory
                            config={childConfig}
                            data={this.props.data[index]}
                            style={childStyle}
                        />
                    )}
                </div>
            </div>
        );
    }
}

// @TileRegistry.register
// class VariableContainer extends React.Component<TileImplProps<VariableContainerConfig, any[]>> {
//     render() {
//         const combinedStyles: Style = {
//             ...(defaultStyles.general),
//             ...(this.props.card && defaultStyles.card),
//             ...(defaultStyles.container),
//             ...(this.props.moreStyles),
//             ...(this.props.style),
//         };
//
//         const childWrapperStyle: Style = this.props.direction == FlexDirection.VERTICAL ?
//             defaultStyles.containerVerticalWrapper :
//             defaultStyles.containerHorizontalWrapper;
//
//         const childStyle: Style = this.props.direction == FlexDirection.VERTICAL ?
//             defaultStyles.containerVerticalChild :
//             defaultStyles.containerHorizontalChild;
//
//         return (
//             <div style={combinedStyles}>
//                 <div style={childWrapperStyle}>
//                     {this.props.childConfigs.map((childConfig, index: number) =>
//                         <TileFactory
//                             config={childConfig}
//                             data={this.props.data[index]}
//                             style={childStyle}
//                         />
//                     )}
//                 </div>
//             </div>
//         );
//     }
// }


@TileRegistry.register
class TextTile extends AbstractTile<GenericTileConfig, any> {
    renderImpl(style: Style) {
        return (
            <div style={style}>
                {this.props.data}
            </div>
        );
    }
}
//TileRegistry.register(TextTile);
