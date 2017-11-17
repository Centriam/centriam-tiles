import * as React from 'react';

import {defaultStyles, styleSettings} from '../providers';
import TileRegistry from '../TileRegistry';
import {AbstractTile, Style, TileFactory, TileConfig} from '../tile';


export const FlexDirection = Object.freeze({
    HORIZONTAL: 'HORIZONTAL',
    VERTICAL: 'VERTICAL',
});


@TileRegistry.register
class Card extends AbstractTile {
    renderImpl(style){ return <div />; } // unused

    render() {
        const combinedStyles = {
            ...(defaultStyles.card),
            ...(defaultStyles.container),
            ...(this.props.moreStyles),
            ...(this.props.style),
        };

        const childStyle = {
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
class FixedContainer extends AbstractTile {
    renderImpl(style) {
        const childWrapperStyle = this.props.direction === FlexDirection.VERTICAL ?
            defaultStyles.containerVerticalWrapper :
            defaultStyles.containerHorizontalWrapper;

        const childStyle = this.props.direction === FlexDirection.VERTICAL ?
            defaultStyles.containerVerticalChild :
            defaultStyles.containerHorizontalChild;

        return (
            <div style={style}>
                <div style={childWrapperStyle}>
                    {this.props.childConfigs.map((childConfig, index) =>
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
//         const combinedStyles = {
//             ...(defaultStyles.general),
//             ...(this.props.card && defaultStyles.card),
//             ...(defaultStyles.container),
//             ...(this.props.moreStyles),
//             ...(this.props.style),
//         };
//
//         const childWrapperStyle = this.props.direction == FlexDirection.VERTICAL ?
//             defaultStyles.containerVerticalWrapper :
//             defaultStyles.containerHorizontalWrapper;
//
//         const childStyle = this.props.direction == FlexDirection.VERTICAL ?
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
class TextTile extends AbstractTile {
    renderImpl(style) {
        return (
            <div style={style}>
                {this.props.data}
            </div>
        );
    }
}
//TileRegistry.register(TextTile);
