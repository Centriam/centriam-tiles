import React from 'react';
import AbstractContainer from './AbstractContainer';
import {valueOrDefault} from '../utils';
import TileRegistry from '../TileRegistry';
import TileTypes from '../TileTypeRegistry';
import {TileFactory, AbstractTile} from '../tile';





export class InteractionAccessConfig {

    constructor(json){
        this.requestData = valueOrDefault(json, 'requestData', null, null);
    }


}


@TileTypes.register
export default class InteractionContainerConfig extends AbstractContainer {


    constructor(json){
        super(json);
        this.type = InteractionContainer.name;
    }

    //TODO: would like to use this in the config here, as it's part of the configuration, but because we use a serperator
    //to pass the config objects down into the children, I don't think this will work.
    //getAccessConfig(accessHash){
    //    let ret = accessHash[this.id];
    //
    //    if(!ret){
    //        throw new Error("Unable to find access config for config: " + id);
    //    }
    //    return ret;
    //}
}



@TileRegistry.register
export class InteractionContainer extends AbstractTile {

    renderImpl(style={}){
        let {
            data,
            accessHash,
            ...config,
        } = this.props;

        let accessConfig = accessHash[config.id];

        if(!accessConfig){
            throw new Error("Unable to find access config for config: " + config.id);
        }

        return (
            <div style={Object.assign({}, style)}>
                {config.childConfig &&
                <TileFactory
                    config={config.childConfig}
                    data={data}
                    style={config.childConfig.style}
                    accessHash={accessHash}
                />
                }
            </div>
        )
    }

}
