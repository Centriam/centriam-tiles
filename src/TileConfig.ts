// Tile Config Schema
// noinspection JSLastCommaInObjectLiteral, JSLastCommaInArrayLiteral
export const schema = {

    title: 'Centriam TileFactory configuration schema',

    type: 'object',
    required: ['type'],

    oneOf: [
        {$ref: '#/definitions/TILE'},
        {$ref: '#/definitions/HORIZ_UNIFORM_CONTAINER'},
        {$ref: '#/definitions/VERT_UNIFORM_CONTAINER'},
        {$ref: '#/definitions/HORIZ_VARIABLE_CONTAINER'},
        {$ref: '#/definitions/VERT_VARIABLE_CONTAINER'},
        {$ref: '#/definitions/NUMBER_X_NUMBER'},
        {$ref: '#/definitions/TABLE'},
    ],

    definitions: {
        _styles: {
            description: 'Object containing React-compatible CSS properties',
            type: 'object',
            additionalProperties: {
                oneOf: [
                    { type: 'string' },
                    { type: 'number' },
                ]
            }
        },

        TILE: {
            required: ['child'],
            properties: {
                type: {type: 'string', 'enum': ['TILE']},
                child: {$ref: '#'},
                style: {$ref: '#/definitions/_styles'},
            },
        },

        _ABSTRACT_UNIFORM_CONTAINER: {
            required: ['children'],
            properties: {
                type: {type: 'string', 'enum': ['VERT_UNIFORM_CONTAINER']},
                children: {type: 'array', items: {$ref: '#'}},
            },
        },
        HORIZ_UNIFORM_CONTAINER: {
            allOf: [
                {properties: {type: {type: 'string', 'enum': ['HORIZ_UNIFORM_CONTAINER']}}},
                {$ref: '#/definitions/_ABSTRACT_UNIFORM_CONTAINER'},
            ]
        },
        VERT_UNIFORM_CONTAINER: {
            allOf: [
                {properties: {type: {type: 'string', 'enum': ['VERT_UNIFORM_CONTAINER']}}},
                {$ref: '#/definitions/_ABSTRACT_UNIFORM_CONTAINER'},
            ]
        },

        _ABSTRACT_VARIABLE_CONTAINER: {
            required: ['children'],
            properties: {
                children: {$ref: '#'},
            },
        },
        HORIZ_VARIABLE_CONTAINER: {
            allOf: [
                {properties: {type: {type: 'string', 'enum': ['HORIZ_VARIABLE_CONTAINER']}}},
                {$ref: '#/definitions/_ABSTRACT_VARIABLE_CONTAINER'},
            ]
        },
        VERT_VARIABLE_CONTAINER: {
            allOf: [
                {properties: {type: {type: 'string', 'enum': ['VERT_VARIABLE_CONTAINER']}}},
                {$ref: '#/definitions/_ABSTRACT_VARIABLE_CONTAINER'},
            ]
        },

        TABLE: {
            properties: {
                type: {type: 'string', 'enum': ['TABLE']}
            },
        },
        NUMBER_X_NUMBER: {
            properties: {
                type: {type: 'string', 'enum': ['NUMBER_X_NUMBER']}
            },
        },

    }
}


