export { AbstractTile, TileFactory, Style } from './tile';
export { default as TileRegistry } from './TileRegistry';
export { defaultStyles } from './providers';

// Load tiles so they self-register
import './containers';
import './visuals';

// (NOTE: UglifyJS will still see this as dead code!
export * as tiles from './tiles';

