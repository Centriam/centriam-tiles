import React from 'react';
import AbstractContainer from './AbstractContainer';
import {valueOrDefault} from '../utils';
import TileRegistry from '../TileRegistry';
import TileTypes from '../TileTypeRegistry';
import {TileFactory, AbstractTile} from '../tile';


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
        base: {
            padding: '5px 10px',
            border: '1px solid #ADB3BF',
            borderRightWidth: 0,
            borderLeftWidth: 0,
        },
        addBorders: {
          borderRightWidth:1,
          borderLeftWidth:1,
        },
        first: {
            borderTopLeftRadius: 1,
            borderBottomLeftRadius: 2,
            borderLeftWidth: 1,
        },
        last: {
            borderTopRightRadius: 1,
            borderBottomRightRadius: 1,
            borderRightWidth: 1,
        },
        active: {
            color: '#fff',
            backgroundColor: '#ADB3BF',
        },
        inactive: {
            color: '#ADB3BF',
            backgroundColor: '#fff',
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
export class ToggleContainer extends AbstractTile {

    constructor(props){
       super(props);

        this.state = {
            active: this.props.childrenConfigs[0]
        };
    }


    renderImpl(style){
        let {
            data,
            accessHash,
            ...config,
        } = this.props;

        let active = this.state.active;

        return (
        <div style={Object.assign({}, ToggleContainerStyles.containerStyle, style)}>
            <div style={Object.assign({}, ToggleContainerStyles.buttons.containerStyle)}>
                {config.childrenConfigs.map((child, i)=>
                    <button
                        key={i}
                        id={i}
                        onClick={(e)=>{
                            this.setState({active:child});
                            e.target.blur();
                        }}
                        style={Object.assign({},
                            ToggleContainerStyles.buttons.base,
                            (this.state.active === child ?
                                ToggleContainerStyles.buttons.active :
                                ToggleContainerStyles.buttons.inactive
                            ),
                            i === 0 ? ToggleContainerStyles.buttons.first : {},
                            i === config.childrenConfigs.length-1 ? ToggleContainerStyles.buttons.last : {},
                            i % 2 ? ToggleContainerStyles.buttons.addBorders : {},
                        )}
                    >
                        {child.label || child.configType.split(/(?=[A-Z])/).join(' ')}
                    </button>
                )}
            </div>
            <TileFactory
                config={active}
                data={data}
                style={active.style}
                accessHash={accessHash}
            />

        </div>
        )
    }

}
