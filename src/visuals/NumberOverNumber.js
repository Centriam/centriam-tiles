import React from 'react';
import AbstractVisual from './AbstractVisual';
import TileRegistry from '../TileRegistry';
import TileTypes from '../TileTypeRegistry';
import {valueOrDefault} from '../utils';

const styles  = {
    defaultPrimary: {
        headerStyle: {
            fontSize:14,
            color: '#ADB3BF',
        },
        dataStyle: {
            fontSize: 42,
            color: '#000',
        },
    },
    defaultSecondary: {
        headerStyle: {
            fontSize:12,
            color: '#ADB3BF',
        },
        dataStyle: {
            fontSize: 16,
            color: '#FF8200',
        },
    }
};

export class headerMapping {
    constructor(json){
        this.dataHeader = valueOrDefault(json, 'dataHeader');
        this.displayHeader = valueOrDefault(json, 'displayHeader', null, this.dataHeader);
        this.headerStyle = valueOrDefault(json, 'headerStyle', null, {});
        this.dataStyle = valueOrDefault(json, 'dataStyle', null, {});
    }
}

headerMapping.STYLES = styles;


const numberOverNumberStyles = {
    numberGroupingContainer: {
        margin:10
    }
};


@TileTypes.register
export default class NumberOverNumberConfig  extends AbstractVisual {
    constructor(json){
        super(json);

        this.type = NumberOverNumberTile.name;
        this.headerMappings = valueOrDefault(json, 'headerMappings', null, []);
        this.dataIndex = valueOrDefault(json, 'dataIndex', null, 0);

    }
}




@TileRegistry.register
class NumberOverNumberTile extends React.Component {
    render() {
        const {
            data,
            moreStyles={},
            ...config,
        } = this.props;


        let dataPoints = [];
        for(let i = 0; i < config.headerMappings.length; i++){
            dataPoints.push({
                ...config.headerMappings[i],
                data:data.data[config.dataIndex][config.headerMappings[i].dataHeader],
            });
        }


        return (
            <div style={Object.assign({}, moreStyles, config.style)}>
                {dataPoints.map((point, i)=>{
                    return <div key={i} style={Object.assign({}, numberOverNumberStyles.numberGroupingContainer)}>
                        <div style={point.headerStyle}>{point.displayHeader}</div>
                        <div style={point.dataStyle}>{point.data}</div>
                    </div>
                })}
            </div>
        );
    }
}
