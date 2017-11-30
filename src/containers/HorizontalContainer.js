import React from 'react';
import AbstractContainer from './AbstractContainer';
import {valueOrDefault} from '../utils';
import TileRegistry from '../TileRegistry';
import TileTypes from '../TileTypeRegistry';
import {AbstractTile, TileFactory} from '../tile';


const HorizontalContainerStyles = {
    containerStyle: {
       display:'flex',
    },
};



@TileTypes.register
export default class HorizontalContainerConfig extends AbstractContainer {
    constructor(json){
        super(json);
        this.type = HorizontalContainer.name;
        this.childConfigs = valueOrDefault(json, 'childConfigs', null, this.childConfig ? [this.childConfig]: [])
    }
}



@TileRegistry.register
export class HorizontalContainer extends AbstractTile {
    static CONFIG_SCHEMA = {
        type: 'object',
        required: ['childConfigs'],
    };

    renderImpl(style={}){
        let {
            data,
            ...config,
        } = this.props;


        return (
        <div style={Object.assign({}, HorizontalContainerStyles.containerStyle, style)}>
            {config.childConfigs.map((config, i)=>{
               return <TileFactory
                   key={i}
                   config={config}
                   data={data}
                   style={Object.assign({}, {flex:1}, config.style)}
               />
            })}
        </div>
        )
    }

}
