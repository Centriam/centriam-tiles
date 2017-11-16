import React from 'react';
import AbstractContainer from './AbstractContainer';
import {valueOrDefault} from '../utils';
import TileRegistry from '../TileRegistry';
import TileTypes from '../TileTypeRegistry';
import {TileFactory} from '../tile';


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
        this.childrenConfigs = valueOrDefault(json, 'childrenConfigs', null, this.childConfig ? [this.childConfig]: [])

    }
}



@TileRegistry.register
class HorizontalContainer extends React.Component {

    constructor(props){
       super(props);
    }


    render(){
        let {
            data,
            moreStyles = {},
            ...config,
        } = this.props;


        return (
        <div style={Object.assign({}, HorizontalContainerStyles.containerStyle, moreStyles, config.style)}>
            {config.childrenConfigs.map((config, i)=>{
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
