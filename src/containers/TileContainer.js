import React from 'react';
import AbstractContainer from './AbstractContainer';
import {valueOrDefault} from '../utils';
import TileRegistry from '../TileRegistry';
import TileTypes from '../TileTypeRegistry';
import {TileFactory} from '../tile';


const TileContainerStyles = {
    containerStyle: {
        backgroundColor: "#fff",
        borderRadius: 2,
        border: '1px solid #CDD1D9',
        boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2)',
        display:'inline-block',
        padding:'0 10px 10px 10px',
        margin: 10,
    },
    titleStyle: {
        container:{
            display:'flex',
            backgroundColor:'#475060',
            alignItems:'center',
            color: '#fff',
            fill: '#fff',
            fontSize:'20px',
            margin:'0 -10px',
            padding:'0 5px',
            height:30,
        },
        iconContainer:{
          display:'flex',
          alignItems:'center',
          height:'25px',
          padding: '0 5px'
        },
        titleContainer: {
          display:'flex',
          alignItems:'center',
          height:'25px',
          padding: '0 5px'
        }
    }
};



@TileTypes.register
export default class TileContainerConfig extends AbstractContainer {
    constructor(json){
        super(json);
        this.type = TileContainer.name;
        this.icon = valueOrDefault(json, 'icon');
        this.iconStyle = valueOrDefault(json, 'iconStyle', null, {});
    }
}



@TileRegistry.register
class TileContainer extends React.Component {

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
        <div style={Object.assign({}, TileContainerStyles.containerStyle, moreStyles, config.style)}>
            <div className="header" style={Object.assign({}, TileContainerStyles.titleStyle.container)}>
                <div style={Object.assign({}, TileContainerStyles.titleStyle.iconContainer, config.iconStyle, )}>
                    {config.icon}
                </div>
                <div style={Object.assign({}, TileContainerStyles.titleStyle.titleContainer, config.labelStyle)}>
                    {config.label}
                </div>
            </div>
            {config.childConfig &&
                <TileFactory
                    config={config.childConfig}
                    data={data}
                    style={config.style}
                />
            }
        </div>
        )
    }

}
