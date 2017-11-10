# Centriam Tile Library

A framework for building "tiles" for reports

## Editing

This project uses TypeScript (https://www.typescriptlang.org/docs/handbook), a variant of JavaScript that adds
transpile-time type checking and annotations.

I'm still evaluating this decision. If it's too much of a pain in the butt, I'll rip it out and go back to ordinary JavaScript. But it's still too early to tell.

A couple of notes to get started:

- Type annotations *follow* the variable, separated by a colon -- e.g. `const x: number = 8`
- Support for Generics using Java-esque angle brackets -- e.g. `function print<T>(x: T) { console.log(x); }`


## Building

The build system is a work-in-progress. Eventually, this should all be handled inside of a Docker container. It should also have two different modes -- a library that can be imported into another React application, and a server running a demo app.

For now, this should get a dev server up and running:

```bash
$ npm install
$ webpack-dev-server
```


## Usage

This library exposes a single React element called `<Tile />` that parses a nested "configuration" object
to render a corresponding "data" object in HTML. 

Every "config" object contains, at a minimum, a "type" key identifying which component class

```jsx harmony

    const myTileConfig = {
        //TODO
    };

    <Tile config={myTileConfig} data={myTileData} />
```

### Styling

When a configuration object contains a `style` property, that style is applied to the tile's root element.

(... TODO: configuring defaultStyles ...) 



### Extending

To add your own tiles to the framework, place the decorator `@TileRegistry.register` before your React class.
Your tile will be available through `<Tile />` configurations

```jsx harmony

    @TileRegistry.register
    class MyTile extends React.Component {
        render() {
            const {
                data,
                style,
            } = this.props;
            
            return <div style={style}>{data}</div>;
        }
    }
    
    <Tile config={{type: 'MyTile'}} data={'Hello world!'} />
```


