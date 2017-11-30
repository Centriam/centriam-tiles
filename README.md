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
$ docker-compose up dev-server
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


# Build targets:

1. Dev Server -- include index.tsx and index.html.
    - run `webpack-dev-server` inside Docker container
    - Use project's own `node_modules` directory so IDE can see library dependencies
2. Something linkable from CX Manager
    - MUST run typescript over project
    - MAY preserve ES6 and JSX
    - Consider making project `node_modules` directory ephemeral 



# Random notes (Karl)

I'm going to have to put this away soon, so this is where I'm at right now:

- I need to build a "Style Provider" to manage the tiles' themes. The goal is to build a style manager system that works
  on two levels:

    1. High-level configuration that affects multiple aspects of the tiles' appearance.
       Things that can't always be blindly applied to the root of a document
        - Font family
        - Font size
        - Color scheme
        - Horizontal and vertical margins/padding.
    2. Low-level configuration of individual tile styles. Many settings use the high-level settings.

- I want to make it so if you define a `static CONFIG_SCHEMA` property on the class, the `<TileBuilder>` will validate the
  Tile's configuration before attempting to render it.

- David made a bunch of helper classes named `*Config` to build a tile's configuration. They fill four purposes:
    1. Fill in the "type" property
    2. Provide sane default values
    3. Help validate input
    4. (Future) Help migrate tile configurations from old versions 

- I need to figure out how to compile this separately from CX so I can disable tree-shaking.
