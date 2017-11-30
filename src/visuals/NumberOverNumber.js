import React from 'react';
import AbstractVisualConfig from './AbstractVisualConfig';
import TileRegistry from '../TileRegistry';
import TileTypes from '../TileTypeRegistry';
import {valueOrDefault} from '../utils';
import {AbstractTile} from '../tile';


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
export default class NumberOverNumberConfig  extends AbstractVisualConfig {
    constructor(json){
        super(json);

        this.type = NumberOverNumberTile.name;
        this.headerMappings = valueOrDefault(json, 'headerMappings', null, []);
        this.dataIndex = valueOrDefault(json, 'dataIndex', null, 0);
    }
}




@TileRegistry.register
export class NumberOverNumberTile extends AbstractTile {
    static CONFIG_SCHEMA = {
        type: 'object',
        required: ['headerMappings', 'dataIndex'],
        properties: {
            headerMappings: {
                type: 'array',
                items: {
                    required: ['dataHeader', 'displayHeader', 'headerStyle', 'dataStyle'],
                    properties: {
                        dataHeader: {type: 'string'},
                        displayHeader: {type: 'string'},
                        headerStyle: {type: 'object'},
                        dataStyle: {type: 'object'},
                    }
                }
            },
            dataIndex: { type: 'number' },
        }
    };

    renderImpl(style) {
        const {
            data,
            ...config,
        } = this.props;

        const dataPoints = config.headerMappings.map(mapping => ({
            ...mapping,
            data: data.data[config.dataIndex][mapping.dataHeader],
        }));

        return (
            <div style={Object.assign({}, style)}>
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
