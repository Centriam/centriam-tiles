import React from 'react';
import AbstractVisual from './AbstractVisual';
import TileRegistry from '../TileRegistry';
import TileTypes from '../TileTypeRegistry';
import {valueOrDefault} from '../utils';

@TileTypes.register
export default class SimpleGraphConfig extends AbstractVisual {
    constructor(json){
        super(json);
        this.type = SimpleGraph.name;
        this.xAxisColumn = valueOrDefault(json, 'xAxisColumn');
        this.yAxisColumn = valueOrDefault(json, 'yAxisColumn');

        // TODO? : move these up into the Abstract so every tile can have it's height and width defined?
        this.height = valueOrDefault(json, 'height', null, 250);
        this.width = valueOrDefault(json, 'width', null, 600);
    }
}


@TileRegistry.register
class SimpleGraph extends React.Component {
    render() {
        const {
            data,
            style,
            ...config,
        } = this.props;

        const width = config.width;
        const height = config.height;


        const dataPoints = data.data;
        const dataLength = dataPoints.length;
        if (dataLength === 0) {
            return <div>
                No data supplied.
            </div>
        }


        // Get range of data
        let xMin = dataPoints[0][config.xAxisColumn];
        let xMax = dataPoints[0][config.xAxisColumn];
        let yMin = dataPoints[0][config.yAxisColumn];
        let yMax = dataPoints[0][config.yAxisColumn];
        for (let i = 0; i < dataLength; i++) {
            let dataPoint = dataPoints[i];
            xMin = Math.min(xMin, dataPoint[config.xAxisColumn]);
            xMax = Math.max(xMax, dataPoint[config.xAxisColumn]);
            yMin = Math.min(yMin, dataPoint[config.yAxisColumn]);
            yMax = Math.max(yMax, dataPoint[config.yAxisColumn]);
        }

        const xRange = (xMax) - (xMin);
        const yRange = (yMax) - (yMin);
        const xScale = width / xRange;
        const yScale = height / yRange;

        console.log(`xmin=${xMin} xmax=${xMax} xrange=${xRange} width=${width} xscale=${xScale}`);
        console.log(`ymin=${yMin} ymax=${yMax} yrange=${yRange} height=${height} yscale=${yScale}`);

        // Direct concatenation is the most performant way to build strings in most JS engines
        let pathData = 'M ';
        for (let i = 0; i < dataLength; i++) {
            const dataPoint = dataPoints[i];
            const xData =  dataPoint[config.xAxisColumn];
            const yData =  dataPoint[config.yAxisColumn];
            const xplot = (xData - xMin) * xScale;
            const yplot = height - (yData - yMin) * yScale;
            pathData += ' ';
            pathData += xplot;
            pathData += ' ';
            pathData += yplot;
        }

        return <div style={style}>
            <svg width={width} height={height}>
                <path d={pathData} style={{stroke: 'black', strokeWidth: '1px', fill: 'none'}} />
            </svg>
        </div>
    }
}
