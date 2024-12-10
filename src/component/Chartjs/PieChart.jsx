import React, { useState, useMemo } from 'react';
import { useEffect } from 'react';
import { Charts } from './Charts';
//import * as dayjs from "dayjs";
//import * as moment from 'moment';

export const PieChart = ({ pieResults = [], pieLabels = [] }) => {
    const [height] = useState(380);
    const [width] = useState(380);
    const options = useMemo(() => ({
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: pieLabels,
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 250,
                        height: 250
                    },
                    legend: {
                        position: 'top',
                        horizontalAlign: 'left',
                        verticalAlign: 'top',
                        floating: true,
                        fontSize: '12px',
                        offsetY: 0,
                        offsetX: 0
                    },
                },
            },
        ],
    }), [pieLabels]);

    const series = useMemo(() => pieResults, [pieResults]);

    return (
        (pieResults.length && pieLabels.length) ? (
            <Charts options={options} type="pie" series={series} width={width} height={height} />
        ) : (
            <p>No data available for the chart.</p>
        )
    );
};

// import React, { useState,useMemo } from 'react';
// import { Charts } from './Charts';
//import * as dayjs from "dayjs";
//import * as moment from 'moment';

// export const PieChart = () => {

//     const [height] = useState(350);
//     const [width] = useState(350);
//     const pieSeries=[44, 55, 13, 43, 22]
//     const series = useMemo(() => pieSeries, [pieSeries]);
//     const options = useMemo(() => ({
//         chart: {
//             width: 380,
//             type: 'pie',
//         },
//         labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
//         // responsive: [
//         //     {
//         //         breakpoint: 480,
//         //         options: {
//         //             chart: {
//         //                 width: 200,
//         //             },
//         //             legend: {
//         //                 position: 'bottom',
//         //             },
//         //         },
//         //     },
            
//         // ],
//     }))


//   return (
//      <Charts options={options} type="pie" series={series} width={width} height={height} />
//   );
// }