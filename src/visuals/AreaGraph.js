import React from 'react';
import AbstractVisual from './AbstractVisual';
import TileRegistry from '../TileRegistry';
import TileTypes from '../TileTypeRegistry';
import {valueOrDefault} from '../utils';


import * as ReactFauxDom from 'react-faux-dom';

import * as d3 from 'd3';


@TileTypes.register
export default class AreaGraphConfig extends AbstractVisual {
    constructor(json){
        super(json);

        this.type = AreaGraph.name;
        this.xAxisColumn = valueOrDefault(json, 'xAxisColumn');
        this.yAxisColumn = valueOrDefault(json, 'yAxisColumn');

        this.areaFillColor = valueOrDefault(json, 'areaFillColor', null, '#0468DC');

        // TODO? : move these up into the Abstract so every tile can have it's height and width defined?
        this.height = valueOrDefault(json, 'height', null, 250);
        this.width = valueOrDefault(json, 'width', null, 600);




    }
}

/**
 * d3-based Area graph
 *
 * This is pretty much a copy of the Line Graph with a few extra steps to make the area chart
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
class AreaGraph extends React.Component {
    render() {
        const paddingLeft = 30;
        const paddingBottom = 30;
        const paddingTop = 50;
        const paddingRight = 30;

        const {
            data,
            style={},
            ...config
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

        const xextents = d3.extent(dataPoints, values => values[config.xAxisColumn]);
        const yextents = d3.extent(dataPoints, values => values[config.yAxisColumn]);
        const xscale = d3.scaleLinear()
            .domain(xextents)
            .range([paddingLeft, width - paddingRight])
            .nice();
        const yscale = d3.scaleLinear()
            .domain(yextents)
            .range([height - paddingBottom, paddingTop])
            .nice();

        // Direct concatenation is the most performant way to build strings in most JS engines
        const path = d3.path();
        /*scope*/{
            const dataPoint = dataPoints[0];
            const xplot = xscale(dataPoint[config.xAxisColumn]);
            const yplot = yscale(dataPoint[config.yAxisColumn]);
            path.moveTo(xplot, yplot);
        }
        for (let i = 1; i < dataLength; i++) {
            const dataPoint = dataPoints[i];
            const xplot = xscale(dataPoint[config.xAxisColumn]);
            const yplot = yscale(dataPoint[config.yAxisColumn]);
            path.lineTo(xplot, yplot);
        }

        const area = d3.area().
            x(d => xscale(d[config.xAxisColumn]) ).
            y0(height - paddingBottom).
            y1(d => yscale(d[config.yAxisColumn]) );

        const ret = ReactFauxDom.createElement('div');

        const g = d3.select(ret)
            .append('svg')
            .attr('width', width)
            .attr('height', height);
        g.append('path')
            .attr('d', path.toString())
            .attr('stroke', 'black')
            .attr('strokeWidth', '1px')
            .attr('fill', 'none');
        g.append('svg:path')
            .attr("d", area(dataPoints))
            .attr('fill', config.areaFillColor);
        g.append('g')
            .attr('transform', `translate(${paddingLeft}, 0)`)
            .call(d3.axisLeft(yscale));
        g.append('g')
            .attr('transform', `translate(0, ${height - paddingBottom})`)
            .call(d3.axisBottom(xscale));

        return ret.toReact();
    }
}
