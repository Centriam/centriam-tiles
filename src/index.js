export { AbstractTile, TileFactory, Style } from 'src/tile';
export { default as TileRegistry } from 'src/TileRegistry';

// Load tiles so they self-register
import './tiles/containers';
import './tiles/basicgraphs';


