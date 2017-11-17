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
    buttons: {
        containerStyle: {
            position:'absolute',
            top:10,
            right:10,
        },
        buttonStyle: {
            active: {
                color: '#fff',
                backgroundColor: '#ADB3BF',
                border: '1px solid #ADB3BF',
            },
            inactive: {
                color: '#ADB3BF',
                backgroundColor: '#fff',
                border: '1px solid #ADB3BF',
            }
        }
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
            <div style={Object.assign({}, ToggleContainerStyles.buttons.containerStyle)}>
                {config.childrenConfigs.map((child, i)=>
                    <button
                        key={i}
                        onClick={(e)=>{
                            this.setState({active:child});
                            e.target.blur();
                        }}
                        style={this.state.active === child ?
                            ToggleContainerStyles.buttons.buttonStyle.active :
                            ToggleContainerStyles.buttons.buttonStyle.inactive
                        }
                    >
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
