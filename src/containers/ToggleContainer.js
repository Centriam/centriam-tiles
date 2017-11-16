import React from 'react';
import AbstractContainer from './AbstractContainer';
import {valueOrDefault} from '../utils';
import TileRegistry from '../TileRegistry';
import TileTypes from '../TileTypeRegistry';
import {TileFactory} from '../tile';


const ToggleContainerStyles = {
    containerStyle: {
      position:'relative',
    },
    buttonContainerStyle: {
      position:'absolute',
      top:10,
      right:10,
    }
};



@TileTypes.register
export default class ToggleContainerConfig extends AbstractContainer {
    constructor(json){
        super(json);
        this.type = ToggleContainer.name;
        this.childrenConfigs = valueOrDefault(json, 'childrenConfigs', null, this.childConfig ? [this.childConfig]: [])
    }
}



@TileRegistry.register
class ToggleContainer extends React.Component {

    constructor(props){
       super(props);

        this.state = {
            active: this.props.childrenConfigs[0]
        };
    }


    render(){
        let {
            data,
            moreStyles = {},
            ...config,
        } = this.props;

        let active = this.state.active;

        return (
        <div style={Object.assign({}, ToggleContainerStyles.containerStyle, moreStyles, config.style)}>
            <div style={Object.assign({}, ToggleContainerStyles.buttonContainerStyle)}>
                {config.childrenConfigs.map((child, i)=>
                    <button onClick={()=>{this.setState({active:child})}} key={i}>
                        {child.label || child.configType.split(/(?=[A-Z])/).join(' ')}
                    </button>
                )}
            </div>
            <TileFactory
                config={active}
                data={data}
                style={active.style}
            />

        </div>
        )
    }

}
