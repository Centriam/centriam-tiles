import Abstract from '../Abstracts';
import {valueOrDefault} from '../utils';

export default class AbstractVisual extends Abstract {
   //I swear there is supposed to be something here, but I can't think of it at the moment
}

export class AxisConfig {
    constructor(json){
        this.columnHeader = valueOrDefault(json, 'columnHeader');
        this.displayLabel = valueOrDefault(json, 'displayLabel', null, this.columnHeader);
        this.labelVisible = valueOrDefault(json, 'labelVisible', null, true);
        this.labelColor = valueOrDefault(json, 'labelColor', null, '#000');
        this.niceAxis = valueOrDefault(json, 'niceAxis', null, true);
    }
}

AxisConfig.constructFromHeader = function(header) {
    return new AxisConfig({
        columnHeader: header
    });
}
