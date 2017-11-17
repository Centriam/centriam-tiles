import React from 'react';
import {valueOrDefault} from './utils';


export default class AbstractConfig {
    constructor(json) {
        // TODO: add ability to just enable wrapping something in a card
        // this.card = valueOrDefault(json, 'card', null, false);
        this.configType = this.constructor.name;

        this.label = valueOrDefault(json, 'label');
        this.labelStyle = valueOrDefault(json, 'labelStyle', null, {});

        this.style = valueOrDefault(json, 'style');
    }
}
