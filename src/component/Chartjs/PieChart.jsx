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
                        width: 200,
                    },
                    legend: {
                        position: 'bottom',
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