import * as React from 'react';
import {render} from 'react-dom';

import {AbstractTile, TileFactory, TileRegistry, Style} from "src/index";
import {defaultStyles} from "src/providers";

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

const US_POPULATION = [
    [1911,93863000],[1912,95335000],[1913,97225000],[1914,99111000],[1915,100546000],
    [1916,101961000],[1917,103268000],[1918,103208000],[1919,104514000],[1920,106461000],
    [1921,108538000],[1922,110049000],[1923,111947000],[1924,114109000],[1925,115829000],
    [1926,117397000],[1927,119035000],[1928,120509000],[1929,121767000],[1930,123076741],
    [1931,124039648],[1932,124840471],[1933,125578763],[1934,126373773],[1935,127250232],
    [1936,128053180],[1937,128824829],[1938,129824939],[1939,130879718],[1940,132122446],
    [1941,133402471],[1942,134859553],[1943,136739353],[1944,138397345],[1945,139928165],
    [1946,141388566],[1947,144126071],[1948,146631302],[1949,149188130],[1950,152271417],
    [1951,154877889],[1952,157552740],[1953,160184192],[1954,163025854],[1955,165931202],
    [1956,168903031],[1957,171984130],[1958,174881904],[1959,177829628],[1960,180671158],
    [1961,183691481],[1962,186537737],[1963,189241798],[1964,191888791],[1965,194302963],
    [1966,196560338],[1967,198712056],[1968,200706052],[1969,202676946],[1970,205052174],
    [1971,207660677],[1972,209896021],[1973,211908788],[1974,213853928],[1975,215973199],
    [1976,218035164],[1977,220239425],[1978,222584545],[1979,225055487],[1980,227224681],
    [1981,229465714],[1982,231664458],[1983,233791994],[1984,235824902],[1985,237923795],
    [1986,240132887],[1987,242288918],[1988,244498982],[1989,246819230],[1990,249438712],
    [1991,252127402],[1992,254994517],[1993,257746103],[1994,260289237],[1995,262764948],
    [1996,265189794],[1997,267743595],[1998,270298524],[1999,272690813],[2000,282171957],
    [2001,285081556],[2002,287803914],[2003,290326418],[2004,293045739],[2005,295753151],
    [2006,298593212],[2007,301579895],[2008,304374846],[2009,307006550],[2010,310232863],
];

const themeColors = {
    GREEN: '#14cb5b',
    YELLOW: '#fcb229',
    RED: '#f71f2c',
};


interface NumberOverNumberTileConfig {
    header1: string,
    header2: string,
}

@TileRegistry.register
class NumberOverNumberTile extends AbstractTile<NumberOverNumberTileConfig, {value1: string, value2: string}> {
    renderImpl(style: Style) {
        const {
            header1,
            header2,
            data,
        } = this.props;

        const header1Style = {
            ...defaultStyles.numberOverNumber.header1Style,
        };

        const value1Style = {
            ...defaultStyles.numberOverNumber.value1Style,
        };

        const header2Style = {
            ...defaultStyles.numberOverNumber.header2Style,
        };

        const value2Style = {
            ...defaultStyles.numberOverNumber.value2Style,
        };

        return (
            <div style={style}>
                <div style={header1Style}>{header1}</div>
                <div style={value1Style}>{data.value1}</div>
                <div style={header2Style}>{header2}</div>
                <div style={value2Style}>{data.value2}</div>
            </div>
        );
    }
}


interface NPSSummaryCardConfig {
    title: string,
    sectionHeaders: string[],
    style: Style,
    headerStyle?: Style,
    sectionHeaderStyle?: Style,
    majorValueStyle?: Style,
    minorValueStyle?: Style,
}

@TileRegistry.register
class NPSSummaryCard extends AbstractTile<NPSSummaryCardConfig, {}> {
    renderImpl(style: Style) {
        const headerStyle = {
            ...defaultStyles.npsSummary.headerStyle,
            ...this.props.headerStyle,
        };

        const sectionHeaderStyle = {
            ...defaultStyles.npsSummary.sectionHeaderStyle,
            ...this.props.sectionHeaderStyle,
        };

        const majorValueStyle = {
            ...defaultStyles.npsSummary.majorValueStyle,
            ...this.props.majorValueStyle,
        };

        const minorValueStyle = {
            ...defaultStyles.npsSummary.minorValueStyle,
            ...this.props.minorValueStyle,
        };

        return <div style={style}>
            <div style={headerStyle}>{this.props.title}</div>

            {this.props.sectionHeaders.map((header: string) =>
                <div style={sectionHeaderStyle}>
                    {header}
                </div>
            )}
        </div>
    }
}

// @TileRegistry.register
// class NPSSummary extends React.Component {
//     render() {
//         return (
//             <TileFactory
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



render(
    <div>
        <TileFactory config={config} data={data} />

        <br />

        <TileFactory
            config={{
                type: 'FixedContainer',
                childConfigs: [
                    {
                        type: 'NumberOverNumberTile',
                        card: true,
                        header1: 'Total Customers in Campaign',
                        header2: 'Percentage of All Customers',
                    },
                    {
                        type: 'NumberOverNumberTile',
                        card: true,
                        header1: 'Contact Customers',
                        header2: 'Percentage of Campaign Customers',
                    },
                    {
                        type: 'NumberOverNumberTile',
                        card: true,
                        header1: 'Left to Contact',
                        header2: 'Percentage of Campaign Customers',
                    },
                    {
                        type: 'NumberOverNumberTile',
                        card: true,
                        header1: 'Customers in Control Group',
                        header2: 'Percentage of All Customers',
                    },
                ]
            }}
            data={[
                {
                    value1: '2,500',
                    value2: '14.68%',
                },
                {
                    value1: 1459,
                    value2: '58.36%',
                },
                {
                    value1: 1041,
                    value2: '41.64%',
                },
                {
                    value1: 750,
                    value2: '30.00%',
                },
            ]}
        />

        <br />

        <TileFactory
            config={{
                type: 'NPSSummaryCard',
                sectionHeaders: [
                    'Customers',
                    'Percentage',
                ],
                style: {
                    background: themeColors.GREEN,
                    color: 'white',
                }
            }}
            data={[
                500,
                '20.00',
            ]}
        />
        {/*
        <TileFactory
            config={{
                type: 'NPSSummary',
            }}
            data={[
                [
                    [
                        'Recommended Offers Given',
                        100,
                        '50.00%',
                    ],
                    [
                        'Non-Recommended Offers Given',
                        20,
                        '20.00%',
                    ],
                    [
                        'Non-Recommended Offers Accepted',
                        99,
                        '99.00%',
                    ],
                ],
                [
                    [
                        'Recommended Offers Given',
                        60,
                        '30.00%',
                    ],
                    [
                        'Non-Recommended Offers Given',
                        35,
                        '35.00%',
                    ],
                    [
                        'Non-Recommended Offers Accepted',
                        50,
                        '83.33%',
                    ],
                ],
                [
                    [
                        'Recommended Offers Given',
                        40,
                        '40.00%',
                    ],
                    [
                        'Non-Recommended Offers Given',
                        45,
                        '45.00%',
                    ],
                    [
                        'Non-Recommended Offers Accepted',
                        31,
                        '77.50%',
                    ],
                ],
            ]}
        />
        */}

        <br />

        <TileFactory
            config={{
                type: 'SimpleD3Graph',
                card: true,

            }}
            data={US_POPULATION}
        />
    </div>,
    document.getElementById('root')
);



