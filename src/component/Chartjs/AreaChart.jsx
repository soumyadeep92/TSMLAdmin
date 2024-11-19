import React, { useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';

export const AreaChart = ({ resultsArea, resultsAreaLabels, chartType = "monthly" }) => {
    const options = useMemo(() => {
        let dateFormat = 'MMM yyyy';
        let categories = resultsAreaLabels;

        if (chartType === 'weekly') {
            dateFormat = 'MMM dd, yyyy';
            categories = resultsAreaLabels.map(date => {
                const currentDate = new Date(date);
                return `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
            });
        }

        if (chartType === 'daily') {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            const filteredData = resultsAreaLabels.reduce((acc, date, index) => {
                const currentDate = new Date(date);
                if (currentDate.getMonth() === currentMonth && currentDate.getFullYear() === currentYear) {
                    acc.push({
                        date: date,
                        value: resultsArea[index],
                    });
                }
                return acc;
            }, []);

            categories = filteredData.map(item => item.date);
            resultsArea = filteredData.map(item => item.value);
        }
        let xaxisLabels = [];

        if (chartType === 'quarterly') {
            dateFormat = 'Q# yyyy';
            categories = resultsAreaLabels.map(date => {
                const currentDate = new Date(date);
                const quarter = Math.floor(currentDate.getMonth() / 3) + 1;
                return `Q${quarter} ${currentDate.getFullYear()}`;
            });

            categories = [...new Set(categories)];


            xaxisLabels = resultsAreaLabels.map(date => {
                const currentDate = new Date(date);
                const quarter = Math.floor(currentDate.getMonth() / 3) + 1;

                if ([0, 3, 6, 9].includes(currentDate.getMonth())) {
                    return `Q${quarter} ${currentDate.getFullYear()}`;
                }
                return '';
            });
        }

        return {
            chart: {
                height: 350,
                type: 'area',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
            },
            xaxis: {
                type: 'category',
                categories: xaxisLabels.lenght > 0 ? xaxisLabels : categories,
                labels: {
                    show: true,
                    formatter: function (value) {
                        return value || '';
                    }
                },
            },
            tooltip: {
                x: {
                    format: dateFormat,
                },
            },
        };
    }, [resultsAreaLabels, chartType]);

    const series = useMemo(() => [{
        name: 'Series 1',
        data: resultsArea,
    }], [resultsArea]);


    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="area" height={350} />
        </div>
    );
};