import * as React from 'react';
import { Component } from 'react';


/**
 * DO NOT USE THIS ON TILES. I'm leaving it here in case I need it again because it's a clever bit of engineering.
 *
 * Higher-order component which injects the component's dimensions through the props.
 *
 * It's basically a reimplementation of a project called "react-dimensions". It's supposed to help when you've got
 * a container and your Javascript needs to know exactly how big it is, in pixels. The downside is that the vertical
 * size has to be manually specified.
 *
 * As written, this is NOT COMPATIBLE with the tile registry because it masks the underlying component's static
 * properties, such as `CONFIG_SCHEMA` and `name`. Use AbstractSVGD3Tile for graphs instead.
 *
 * @param widthPropName - Name of property to pass the width to the child component
 * @param heightPropName - Ditto, but for height
 * @return {function(Component): Component} - Higher-order component you can apply to a class
 */
export default function autoSize ({widthPropName='width', heightPropName='height'}={}) {
    return Wrapped => (
        class extends Component {

            static wrapped = Wrapped;

            constructor(props) {
                super(props);

                this.state = {
                    width: 0,
                    height: 0,
                }
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

            checkDimensions = () => {
                const width = (this.ref) ? this.ref.offsetWidth : 0;
                const height = (this.ref) ? this.ref.offsetHeight : 0;

                if (width !== this.state.width || height !== this.state.height) {
                    this.setState({width, height});
                }
            };

            render() {
                const {
                    style,
                    innerStyle,
                    ...props
                } = this.props;

                let width;
                if (widthPropName in props) {
                    width = props[widthPropName];
                    delete props[widthPropName];
                }

                let height;
                if (heightPropName in props) {
                    height = props[heightPropName];
                    delete props[heightPropName];
                }

                return (
                    <div
                        ref={this.setRef}
                        style={{position: 'relative', width, height, ...style}}
                    >
                        {(this.ref) &&
                        React.createElement(Wrapped, {
                            ...props,
                            style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%', ...innerStyle
                            },
                            [widthPropName]: this.state.width,
                            [heightPropName]: this.state.height,
                        })
                        }
                    </div>
                );
            }
        }
    );
}
