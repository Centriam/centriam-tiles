import Abstract from '../Abstracts';
import {valueOrDefault} from '../utils';
import TileTypeRegistry from '../TileTypeRegistry'

export default class AbstractContainer extends Abstract {
    constructor(json){
        super(json);
        this.childConfig = valueOrDefault(
            json,
            'childConfig',
            json && json.childConfig && json.childConfig.configType ? TileTypeRegistry.get(json.childConfig.configType) : null
        )
    }
}
