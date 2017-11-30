import * as React from 'react';
import {render} from 'react-dom';

import {AbstractTile, TileFactory, TileRegistry, Style, defaultStyles} from "src";

import CardContainerConfig from 'src/containers/CardContainer';
import HorizontalContainerConfig from 'src/containers/HorizontalContainer';
import ToggleContainerConfig from 'src/containers/ToggleContainer';
import NumberOverNumberConfig, {headerMapping} from 'src/visuals/NumberOverNumber';

import LineGraphConfig, {LineGraph} from 'src/visuals/LineGraph';
import AreaGraphConfig from 'src/visuals/AreaGraph';

import {AxisConfig} from 'src/visuals/AbstractVisualConfig';
import {NumberOverNumberTile} from "../src/visuals/NumberOverNumber";

/*
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


@TileRegistry.register
class NPSSummaryCard extends AbstractTile {
    renderImpl(style) {
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

            {this.props.sectionHeaders.map(header =>
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

*/


// Half-baked idea: What if we replace helper classes with a static method that generates sane defaults and validates
// configurations against a schema?
const numberOverNumberConf = NumberOverNumberTile.config({
    card:true,
    dataIndex: 0,
    headerMappings: [
        {
            dataHeader: 'Header 1',
            displayHeader: "First",
            headerStyle: headerMapping.STYLES.defaultPrimary.headerStyle,
            dataStyle: headerMapping.STYLES.defaultPrimary.dataStyle,
        },
        {
            dataHeader: 'Header 2',
            displayHeader: "LAST",
            headerStyle: headerMapping.STYLES.defaultSecondary.headerStyle,
            dataStyle: headerMapping.STYLES.defaultSecondary.dataStyle,
        },
    ]
});


let tileContainerConfig = {
    type : 'TileContainer',
    icon : undefined,
    iconStyle : {},
    childConfig: undefined,
    configType : 'TileContainerConfig',
    label: undefined,
    labelStyle : {},
    style: {}
};


let data;
{
    data = {
        headers: ['x', 'Header 1', 'Header 2', 'Header 3'],
        data: []
    };

    let firstPoint = {[data.headers[0]]: 1};

    for (let j = 1; j < data.headers.length; j++) {
        firstPoint[data.headers[j]] = Math.floor(Math.random() * 20);
    }

    data.data.push(firstPoint);

    for(let i = 1; i <=52; i++){
        let point = {[data.headers[0]]: i};
        for(let j = 1; j < data.headers.length; j++){
            point[data.headers[j]] = data.data[i-1][data.headers[j]] +
                (Math.floor((Math.random()*2)) % 2 === 0 ? 1 : -1) * Math.floor(Math.random()*5);
        }
        data.data.push(point);
    }
}

let fourCardsConfig = new HorizontalContainerConfig({
    tile: true,
    childConfigs: [
        {...numberOverNumberConf, dataIndex: 0, style: {backgroundColor: '#55F'}},
        {...numberOverNumberConf, dataIndex: 1},
        {...numberOverNumberConf, dataIndex: 2},
        {...numberOverNumberConf, dataIndex: 3},
    ]
});


const rightChevronIcon = (
    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"/>
    </svg>
);

render(
    <div>

        <div style={{display:'flex'}}>
            {
                //base example: note a good chunk of the config was written without classes
            }
            <TileFactory data={data} config={{
                ...tileContainerConfig,

                label: 'Tile Container',
                icon: rightChevronIcon,
                iconStyle: {},
                childConfig: {...numberOverNumberConf, card:false},
                labelStyle: {},
            }} />
            {
                //Classed example: Lots of classes making it easier to make all these charts
            }
            <TileFactory data={data} config={{
                ...tileContainerConfig,

                style: { flexGrow: 1, flexBasis: 0 },

                childConfig: new ToggleContainerConfig({
                    childConfigs: [
                        new LineGraphConfig({
                            label: 'first',
                            xAxisColumn: new AxisConfig({
                                columnHeader: data.headers[0],
                                displayLabel: 'weeks',
                                labelColor: '#00f',
                                niceAxis: false,
                            }),
                            yAxisColumn: new AxisConfig({
                                columnHeader: data.headers[1],
                                displayLabel: 'Counts',
                                labelColor: '#aa0'
                            }),
                            style: { minHeight: '300px' },
                        }),
                        new AreaGraphConfig({
                            label: 'first - area',
                            xAxisColumn: new AxisConfig({
                                columnHeader: data.headers[0],
                                displayLabel: 'weeks',
                                labelColor: '#00f',
                                niceAxis: false,
                            }),
                            yAxisColumn: new AxisConfig({
                                columnHeader: data.headers[1],
                                displayLabel: 'Counts',
                                labelColor: '#aa0'
                            }),
                            style: { minHeight: '300px' },
                            areaFillColor: 'rgba(4,104,220, .4)',
                            height: '100%',
                        }),
                        new LineGraphConfig({
                            label: 'second',
                            xAxisColumn: AxisConfig.constructFromHeader(data.headers[0]),
                            yAxisColumn: AxisConfig.constructFromHeader(data.headers[2]),
                            style: { minHeight: '300px' },
                        }),
                        new AreaGraphConfig({
                            label: 'second - area',
                            xAxisColumn: AxisConfig.constructFromHeader(data.headers[0]),
                            yAxisColumn: AxisConfig.constructFromHeader(data.headers[2]),
                            style: { minHeight: '300px' },
                        }),
                        new LineGraphConfig({
                            label: 'third',
                            xAxisColumn: AxisConfig.constructFromHeader(data.headers[0]),
                            yAxisColumn: AxisConfig.constructFromHeader(data.headers[3]),
                            style: { minHeight: '300px' },
                        }),
                        new AreaGraphConfig({
                            label: 'third - area',
                            xAxisColumn: AxisConfig.constructFromHeader(data.headers[0]),
                            yAxisColumn: AxisConfig.constructFromHeader(data.headers[3]),
                            style: { minHeight: '300px' },
                        })
                    ]
                })
            }}/>
            {
                //Sanity check: very little is actually needed to make a chart, you can just pull the chart directly
            }
            <LineGraph data={data} {...new LineGraphConfig({
                card: true,
                label: 'first',
                xAxisColumn: AxisConfig.constructFromHeader(data.headers[0]),
                yAxisColumn: AxisConfig.constructFromHeader(data.headers[1]),
                style: { flexGrow: 1, flexBasis: 0 }
            })} />
        </div>
        <br/>

        <TileFactory data={data} config={numberOverNumberConf} />

        <br />

        <TileFactory data={data} config={fourCardsConfig} />

        <br />

        <TileFactory data={data} config={{
            ...tileContainerConfig,

            label: 'Containing Container',
            icon: rightChevronIcon,
            childConfig: fourCardsConfig
        }} />

        <br />
    </div>,
    document.getElementById('root')
);

