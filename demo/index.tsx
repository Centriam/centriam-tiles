import * as React from 'react';
import {render} from 'react-dom';

import {Tile, TileImplProps, TileRegistry} from "../src";

const config = {
    type: 'FixedContainer',
    direction: 'HORIZONTAL',
    card: true,
    childConfigs: [
        {
            type: 'TextTile',
        },
        {
            type: 'TextTile',
            card: true,
            style: {
                background: 'linear-gradient(135deg, rgb(50, 200, 50), rgb(20, 250, 250))',
                color: 'white',
            },
        }
    ],
};

const data = [
    'NPS',
    'Hello world!',
];

const themeColors = {
    GREEN: '#14cb5b',
    YELLOW: '#fcb229',
    RED: '#f71f2c',
};


render(<Tile config={config} data={data} />, document.getElementById('root'));


interface NumberOverNumberTileConfig {
    header1: string,
    header2: string,
}

@TileRegistry.register
class NumberOverNumberTile extends React.Component<TileImplProps<NumberOverNumberTileConfig, {value1: string, value2: string}>> {
    render() {
        const {
            header1,
            header2,
            data,
        } = this.props;

        return (
            <div>
                <div>{header1}</div>
                <div>{data.value1}</div>
                <div>{header2}</div>
                <div>{data.value2}</div>
            </div>
        );
    }
}

render(
    <Tile
        config={{
            type: 'FixedContainer',
            childConfigs: [
                {
                    type: 'Card',
                    childConfig: {
                        type: 'NumberOverNumberTile',
                        card: true,
                        header1: 'Recommended Offers Given',
                        header2: 'Percentage of Campaign Customers',
                    }
                },
                {
                    type: 'Card',
                    childConfig: {
                        type: 'NumberOverNumberTile',
                        card: true,
                        header1: 'Recommended Offers Given',
                        header2: 'Percentage of Campaign Customers',
                    }
                },
            ]
        }}
        data={[
            {
                value1: 200,
                value2: '11.75%',
            },
            {
                value1: 100,
                value2: '5.44%',
            },
        ]}
    />,
    document.getElementById('root2')
);



// @TileRegistry.register
// class NPSSummaryCard extends React.Component {
//     render() {
//         const {
//             title,
//             sectionHeaders,
//         } = this.props;
//
//         return
//     }
// }
//
// @TileRegistry.register
// class NPSSummary extends React.Component {
//     render() {
//         return (
//             <Tile
//                 config={{
//                     type: 'FixedContainer',
//                     card: true,
//                     childConfigs: [
//                         {
//                             type: 'NPSSummaryCard',
//                             title: 'Promoters',
//                             sections: [
//                                 'Recommended Offers Given',
//                                 'Non-Recommended Offers Given',
//                                 'Recommended Offers Accepted',
//                             ]
//                         }
//                     ]
//                 }}
//                 data={}
//             />
//         )
//     }
// }
//
//
// render(
//     <Tile
//         config={{
//             type: 'NPSSummary',
//         }}
//         data={[
//             [
//                 [
//                     'Recommended Offers Given',
//                     100,
//                     '50.00%',
//                 ],
//                 [
//                     'Non-Recommended Offers Given',
//                     20,
//                     '20.00%',
//                 ],
//                 [
//                     'Non-Recommended Offers Accepted',
//                     99,
//                     '99.00%',
//                 ],
//             ],
//             [
//                 [
//                     'Recommended Offers Given',
//                     60,
//                     '30.00%',
//                 ],
//                 [
//                     'Non-Recommended Offers Given',
//                     35,
//                     '35.00%',
//                 ],
//                 [
//                     'Non-Recommended Offers Accepted',
//                     50,
//                     '83.33%',
//                 ],
//             ],
//             [
//                 [
//                     'Recommended Offers Given',
//                     40,
//                     '40.00%',
//                 ],
//                 [
//                     'Non-Recommended Offers Given',
//                     45,
//                     '45.00%',
//                 ],
//                 [
//                     'Non-Recommended Offers Accepted',
//                     31,
//                     '77.50%',
//                 ],
//             ],
//         ]}
//     />,
//     document.getElementById('root2')
// );
