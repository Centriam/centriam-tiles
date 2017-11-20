import React from 'react';
import AbstractVisual, {AxisConfig} from './AbstractVisual';
import TileRegistry from '../TileRegistry';
import TileTypes from '../TileTypeRegistry';
import {valueOrDefault} from '../utils';
import {AbstractTile} from '../tile';

import * as ReactFauxDom from 'react-faux-dom';

import * as d3 from 'd3';


@TileTypes.register
export default class LineGraphConfig extends AbstractVisual {
    constructor(json){
        super(json);

        this.type = LineGraph.name;

        this.xAxisColumn = valueOrDefault(json, 'xAxisColumn', AxisConfig);
        this.yAxisColumn = valueOrDefault(json, 'yAxisColumn', AxisConfig);

        this.lineColor = valueOrDefault(json, 'lineColor', null, 'rgb(4,104,220)');

        // TODO? : move these up into the Abstract so every tile can have it's height and width defined?
        this.height = valueOrDefault(json, 'height', null, 250);
        this.width = valueOrDefault(json, 'width', null, 600);
    }
}

/**
 * d3-based line graph
 *
 * - d3 is imperative; React is declarative. The library ReactFauxDom bridges this gap.
 * - We aleady have a charting library, "re-charts" (?) We're using d3 anyway because:
 *      * d3 has a large community of developers and examples
 *      * It's framework-independent.
 *
 * - .enter() changes the selection to elements which are "entering" a document because there's new data.
 * - .exit() selects elements which should be removed because data is "exiting"
 *
 *
 * Possible configuration:
 * - xmin/xmax/ymin/ymax -- automatic versus manual
 *      * Major use case: Do we force the extents to include the origin?
 *      * Round to nearest "natural" number
 *      * "auto" breaks when scaling is automatic but there's not data.
 * - Data line style
 *      * Stroke width, style, color
 *      * Mark data points
 *          * What if there's too many data points to show them?
 *      * Mouse-over to show the value
 *          * Itself involves
 *
 * @param {Style} style
 * @return {React.ReactElement<any>}
 */
@TileRegistry.register
export class LineGraph extends AbstractTile {
    renderImpl(style) {

        const {
            data,
            ...config
        } = this.props;

        const paddingLeft = 30;
        const paddingBottom = 30 + (config.xAxisColumn.labelVisible ? 10 : 0);
        const paddingTop = 50;
        const paddingRight = 30;

        const width = config.width;
        const height = config.height;

        const xAxisColumnHeader = config.xAxisColumn.columnHeader;
        const yAxisColumnHeader = config.yAxisColumn.columnHeader;

        const dataPoints = data.data;
        const dataLength = dataPoints.length;
        if (dataLength === 0) {
            return <div>
                No data supplied.
            </div>
        }

        const xextents = d3.extent(dataPoints, values => values[xAxisColumnHeader]);
        const yextents = d3.extent(dataPoints, values => values[yAxisColumnHeader]);

        let xScale = d3.scaleLinear()
            .domain(xextents)
            .range([paddingLeft, width - paddingRight]);

        if(config.xAxisColumn.niceAxis){
            xScale = xScale.nice()
        }

        let yScale = d3.scaleLinear()
            .domain(yextents)
            .range([height - paddingBottom, paddingTop]);

        if(config.yAxisColumn.niceAxis){
            yScale = yScale.nice()
        }

        // Direct concatenation is the most performant way to build strings in most JS engines
        const path = d3.path();
        /*scope*/{
            const dataPoint = dataPoints[0];
            const xplot = xScale(dataPoint[xAxisColumnHeader]);
            const yplot = yScale(dataPoint[yAxisColumnHeader]);
            path.moveTo(xplot, yplot);
        }
        for (let i = 1; i < dataLength; i++) {
            const dataPoint = dataPoints[i];
            const xplot = xScale(dataPoint[xAxisColumnHeader]);
            const yplot = yScale(dataPoint[yAxisColumnHeader]);
            path.lineTo(xplot, yplot);
        }

        const ret = ReactFauxDom.createElement('div');

        const g = d3.select(ret)
            .append('svg')
            .attr('width', width)
            .attr('height', height);
        g.append('path')
            .attr('d', path.toString())
            .attr('stroke', config.lineColor)
            .attr('strokeWidth', '1px')
            .attr('fill', 'none');
        g.append('g')
            .attr('transform', `translate(${paddingLeft}, 0)`)
            .call(d3.axisLeft(yScale));
        g.append('g')
            .attr('transform', `translate(0, ${height - paddingBottom})`)
            .call(
                d3.axisBottom(xScale)
                    .tickValues(d3.range(
                        dataPoints[0][xAxisColumnHeader],
                        dataPoints[dataLength-1][xAxisColumnHeader]+1,
                        1
                    ))
            );

        if(config.xAxisColumn.labelVisible){
            g.append('text')
                .attr("class", "x label")
                .attr("text-anchor", "middle")
                .attr("x", width/2)
                .attr("y", height)
                .attr('fill', config.xAxisColumn.labelColor)
                .text(config.xAxisColumn.displayLabel);
        }


        if(config.yAxisColumn.labelVisible){
            g.append('text')
                .attr("class", "y label")
                .attr("text-anchor", "middle")
                .attr("x", paddingLeft)
                .attr("y", paddingTop-10)
                .attr('fill', config.yAxisColumn.labelColor)
                .text(config.yAxisColumn.displayLabel);
        }


        return (
            <div style={Object.assign({}, style)}>
                {ret.toReact()}
            </div>
        )
    }
}
