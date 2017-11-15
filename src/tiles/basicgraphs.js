import * as React from 'react';

import TileRegistry from "src/TileRegistry";
import {AbstractTile, Style} from "../tile";

import * as ReactFauxDom from 'react-faux-dom';

import * as d3 from 'd3';


@TileRegistry.register
class SimpleGraph extends AbstractTile {
    renderImpl(style) {
        const width = 800;
        const height = 600;

        const data = this.props.data;
        const dataLength = data.length;
        if (dataLength === 0) {
            return <div>
                No data supplied.
            </div>
        }


        // Get range of data
        let xmin = data[0][0];
        let xmax = data[0][0];
        let ymin = data[0][1];
        let ymax = data[0][1];
        for (let i = 0; i < dataLength; i++) {
            const [x, y] = data[i];
            xmin = Math.min(xmin, x);
            xmax = Math.max(xmax, x);
            ymin = Math.min(ymin, y);
            ymax = Math.max(ymax, y);
        }

        const xrange = (xmax) - (xmin);
        const yrange = (ymax) - (ymin);
        const xscale = width / xrange;
        const yscale = height / yrange;

        console.log(`xmin=${xmin} xmax=${xmax} xrange=${xrange} width=${width} xscale=${xscale}`);
        console.log(`ymin=${ymin} ymax=${ymax} yrange=${yrange} height=${height} yscale=${yscale}`);

        // Direct concatenation is the most performant way to build strings in most JS engines
        let pathData = 'M ';
        for (let i = 0; i < dataLength; i++) {
            const [xdata, ydata] = data[i];
            const xplot = (xdata - xmin) * xscale;
            const yplot = height - (ydata - ymin) * yscale;
            pathData += ' ';
            pathData += xplot;
            pathData += ' ';
            pathData += yplot;
        }

        return <div style={style}>
            <svg width={800} height={600}>
                <path d={pathData} style={{stroke: 'black', strokeWidth: '1px', fill: 'none'}} />
            </svg>
        </div>
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
class SimpleD3Graph extends AbstractTile {
    renderImpl(style) {
        const width = 800;
        const height = 600;
        const paddingLeft = 100;
        const paddingBottom = 30;
        const paddingTop = 30;
        const paddingRight = 30;

        const data = this.props.data;
        const dataLength = data.length;
        if (dataLength === 0) {
            return <div>
                No data supplied.
            </div>
        }

        const xextents = d3.extent(data, values => values[0]);
        const yextents = d3.extent(data, values => values[1]);
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
            const [xdata, ydata] = data[0];
            const xplot = xscale(xdata);
            const yplot = yscale(ydata);
            path.moveTo(xplot, yplot);
        }
        for (let i = 1; i < dataLength; i++) {
            const [xdata, ydata] = data[i];
            const xplot = xscale(xdata);
            const yplot = yscale(ydata);
            path.lineTo(xplot, yplot);
        }

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
        g.append('g')
            .attr('transform', `translate(${paddingLeft}, 0)`)
            .call(d3.axisLeft(yscale));
        g.append('g')
            .attr('transform', `translate(0, ${height - paddingBottom})`)
            .call(d3.axisBottom(xscale));

        return ret.toReact();
    }
}
