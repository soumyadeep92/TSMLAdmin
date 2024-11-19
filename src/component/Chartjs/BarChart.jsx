import React, { useState, useMemo } from 'react';
import { Charts } from './Charts';
import * as moment from 'moment';
import { useSelector } from 'react-redux';

export const BarChart = ({ barOpenResults = [], barWIPResults = [], barClosedResults = [], barType = '' }) => {

    const [height] = useState(280);

    const series = useMemo(() => [
        {
            name: 'Open',
            data: barType == "Open" ? barOpenResults : [],
        },
        {
            name: 'WIP',
            data: barType == "WIP" ? barWIPResults : [],
        },
        {
            name: 'Closed',
            data: barType == "Closed" ? barClosedResults : [],
        },
    ], [barOpenResults, barWIPResults, barClosedResults]);

    const options = useMemo(() => {
        const categories = [];

        if (barOpenResults.length > 0) {
            categories.push(...barOpenResults.map((_, index) => barOpenResults[index].x));
        }
        if (barWIPResults.length > 0) {
            categories.push(...barWIPResults.map((_, index) => barWIPResults[index].x));
        }
        if (barClosedResults.length > 0) {
            categories.push(...barClosedResults.map((_, index) => barClosedResults[index].x));
        }

        return {
            chart: {
                type: 'bar',
                height: 380,
                stacked: true, // Optional: stack bars if relevant
            },
            xaxis: {
                categories: categories.length > 0 ? categories : [],
                type: 'category',
                labels: {
                    style: {
                        fontSize: '12px',
                        fontWeight: 600,
                    },
                },
            },
            tooltip: {
                x: {
                    formatter: (val) => `Label: ${val}`,
                },
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '50%',
                },
            },
            legend: {
                position: 'top',
            },
        }
    }, [barOpenResults, barWIPResults, barClosedResults]);

    return (
        <Charts options={options} type="bar" series={series} height={height} />
    );
};