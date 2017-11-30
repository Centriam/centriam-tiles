import * as React from 'react';
import { Component } from 'react';

import * as ReactFauxDom from 'react-faux-dom';

import * as d3 from 'd3';
import {AbstractTile} from "../tile";


/**
 * Parent class for graphs that handles the following:
 *
 * - Create an <svg> tag that can dynamically resize itself by updating its `width` and `height` properties
 *   (if you don't do this, the SVG's internal coordinate system may not match up with the HTML page,
 *   distorting everything that you draw.)
 *
 *     ^ The trick is to create a dynamically-sized surrogate parent <div>, read its dimensions whenever
 *       the window is resized, and render the child <svg> with absolute positioning and sizing so it doesn't
 *       influence the size of its parent.
 *
 * - Read back the current `width` and `height` into `this.state` so subclasses know the drawing area's dimensions
 *
 * - Expose the <svg> tag as a d3 API to make it easier to draw graphs
 *
 * Comments:
 *   "Favor composition over inheritance" is the general advice, but I'm clearly using inheritance here.
 *
 *   I tried doing composition; it didn't work too well. In React, there's a pattern called "higher-order components"
 *   (https://reactjs.org/docs/higher-order-components.html) where you pass your component to a function, which
 *   wraps the component with a second component that renders your component.
 *
 *                                     <Wrapper>
 *      MyComponent  ->  function  ->     <MyComponent />
 *                                     </Wrapper>
 *
 *   That's how a project called "react-dimensions" works. There, a higher-order component called "Dimension"
 *   reads the width and height (just like this class, with a surrogate parent <div>) and injects them into
 *   the child through the props.
 *
 *   However, the tile system cannot handle wrapped/higher-order components. When you use a higher-order component,
 *   you lose the reference to the original one. The tile system must be able to read static properties
 *   on tile classes such as `CONFIG_SCHEMA` and `.name`, but wrappers don't mirror those properties.
 *
 *   Class inheritance in Javascript/ES6 preserves these static references, so I need to use it here.
 */
export default class AbstractSVGD3Tile extends AbstractTile {

    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            height: 0,
        };
    }

    componentWillMount() {
        window.addEventListener('resize', this.checkDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.checkDimensions);
    }

    setRef = ref => {
        this.ref = ref;
        this.checkDimensions();
    };

    // Call this whenever the component may have been resized
    checkDimensions = () => {
        // Read the current dimensions of the wrapper component
        const width = (this.ref) ? this.ref.offsetWidth : 0;
        const height = (this.ref) ? this.ref.offsetHeight : 0;

        // Guard: Only cause a re-render (setState() always does) if the dimensions have changed
        if (width !== this.state.width || height !== this.state.height) {
            this.setState({width, height});
        }
    };

    renderImpl(style) {
        const width = (this.ref) ? this.ref.offsetWidth : 0;
        const height = (this.ref) ? this.ref.offsetHeight : 0;

        const ret = ReactFauxDom.createElement('svg');

        if (this.ref) {
            d3.select(ret)
                .attr('width', width)
                .attr('height', height)
                .style('position', 'absolute')
                .style('top', 0)
                .style('left', 0)
                .call(this.renderD3.bind(this));
        }

        return <div ref={this.setRef} style={{position: 'relative', ...style}}>
            {this.ref && ret.toReact()}
        </div>
    }

    /**
     * @param {d3.selection} svg
     */
    renderD3(svg) {
        throw new Error("Unimplemented abstract method");
    }
}
