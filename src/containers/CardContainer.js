import React from 'react';
import AbstractContainer from './AbstractContainer';
import {valueOrDefault} from '../utils';
import TileRegistry from '../TileRegistry';
import TileTypes from '../TileTypeRegistry';
import {TileFactory, AbstractTile} from '../tile';


const CardContainerStyles = {
    containerStyle: {
        backgroundColor: "#fff",
        borderRadius: 2,
        border: '1px solid #CDD1D9',
        boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2)',
        display:'inline-block',
        padding:10,
        margin: 10,
    },
};



@TileTypes.register
export default class CardContainerConfig extends AbstractContainer {
    constructor(json){
        super(json);
        this.type = CardContainer.name;

    }
}



@TileRegistry.register
export class CardContainer extends AbstractTile {

    renderImpl(style={}){
        let {
            data,
            ...config,
        } = this.props;

        return (
        <div style={Object.assign({}, CardContainerStyles.containerStyle, style)}>
            {config.childConfig &&
                <TileFactory
                    config={config.childConfig}
                    data={data}
                    style={config.childConfig.style}
                />
            }
        </div>
        )
    }

}
