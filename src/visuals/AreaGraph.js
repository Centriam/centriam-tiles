import * as d3 from 'd3';
import React from 'react';

import AbstractVisualConfig, {AxisConfig} from './AbstractVisualConfig';
import TileRegistry from '../TileRegistry';
import TileTypes from '../TileTypeRegistry';
import AbstractSVGD3Tile from "./AbstractSVGD3Tile";
import {valueOrDefault} from '../utils';


@TileTypes.register
export default class AreaGraphConfig extends AbstractVisualConfig {
    constructor(json){
        super(json);

        this.type = AreaGraph.name;
        this.xAxisColumn = valueOrDefault(json, 'xAxisColumn', AxisConfig);
        this.yAxisColumn = valueOrDefault(json, 'yAxisColumn', AxisConfig);

        this.lineColor = valueOrDefault(json, 'lineColor', null, 'rgb(4,104,220)');
        this.areaFillColor = valueOrDefault(json, 'areaFillColor', null, '#0468DC');
    }
}

/**
 * d3-based area graph
 */
@TileRegistry.register
export class AreaGraph extends AbstractSVGD3Tile {
    /**
     * @param {d3.selection} svg
     */
    renderD3(svg) {
        const {
            data,
            ...config
        } = this.props;

        const paddingLeft = 30;
        const paddingBottom = 30 + (config.xAxisColumn.labelVisible ? 10 : 0);
        const paddingTop = 50;
        const paddingRight = 30;

        const width = this.state.width;
        const height = this.state.height;

        const xAxisColumnHeader = config.xAxisColumn.columnHeader;
        const yAxisColumnHeader = config.yAxisColumn.columnHeader;

        const dataPoints = data.data;
        const dataLength = dataPoints.length;
        if (dataLength === 0) {
            svg.append('text')
                .attr('x', width/2)
                .attr('y', height/2)
                .attr('text-align', 'middle')
                .text('No data supplied.');
            return;
        }

        const xextents = d3.extent(dataPoints, values => values[xAxisColumnHeader]);
        const yextents = d3.extent(dataPoints, values => values[yAxisColumnHeader]);

        const xScale = d3.scaleLinear()
            .domain(xextents)
            .range([paddingLeft, width - paddingRight]);

        if (config.xAxisColumn.niceAxis) {
            xScale.nice();
        }

        const yScale = d3.scaleLinear()
            .domain(yextents)
            .range([height - paddingBottom, paddingTop]);

        if (config.yAxisColumn.niceAxis) {
            yScale.nice();
        }

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

        //Note: this returns a function.
        const area = d3.area().
            x(d => xScale(d[xAxisColumnHeader]) ).
            y0(height - paddingBottom).
            y1(d => yScale(d[yAxisColumnHeader]) );

        svg.append('path')
            .attr('d', path.toString())
            .attr('stroke', config.lineColor)
            .attr('strokeWidth', '1px')
            .attr('fill', 'none');
        svg.append('path')
            .attr("d", area(dataPoints))
            .attr('fill', config.areaFillColor);
        svg.append('g')
            .attr('transform', `translate(${paddingLeft}, 0)`)
            .call(d3.axisLeft(yScale));
        svg.append('g')
            .attr('transform', `translate(0, ${height - paddingBottom})`)
            .call(
                d3.axisBottom(xScale)
                    .tickValues(d3.range(
                        dataPoints[0][xAxisColumnHeader],
                        dataPoints[dataLength-1][xAxisColumnHeader]+1,
                        1
                    ))
                    .tickSize(10)
            );

        if(config.xAxisColumn.labelVisible){
            svg.append('text')
                .attr("class", "x label")
                .attr("text-anchor", "middle")
                .attr("x", width/2)
                .attr("y", height)
                .attr('fill', config.xAxisColumn.labelColor)
                .text(config.xAxisColumn.displayLabel);
        }

        if(config.yAxisColumn.labelVisible){
            svg.append('text')
                .attr("class", "y label")
                .attr("text-anchor", "middle")
                .attr("x", paddingLeft)
                .attr("y", paddingTop-10)
                .attr('fill', config.yAxisColumn.labelColor)
                .text(config.yAxisColumn.displayLabel);
        }
    }
}
