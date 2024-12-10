import React, { useState, useMemo, useEffect } from 'react';
import { Charts } from './Charts';
import { dashboardBarResults } from '../../apis/apis'

export const BarChart = ({ bodyReq = {}, frequency = '' }) => {
    const [barChartOpen, setBarChartOpen] = useState([])
    const [barChartWIP, setBarChartWIP] = useState([])
    const [barChartClosed, setBarChartClosed] = useState([])
    const [months, setMonths] = useState([])

    useEffect(() => {
        dashboardBarResults(bodyReq).then(res => {
            setBarChartOpen(res.response.data.cvrOpenArr)
            setBarChartWIP(res.response.data.cvrWIPArr)
            setBarChartClosed(res.response.data.cvrClosedArr)
            setMonths(res.response.data.months)
        })
    }, [bodyReq])
    const [height] = useState(280);

    const series = useMemo(() => [
        {
            name: 'Open',
            data: barChartOpen.length > 0 ? barChartOpen : [],
        },
        {
            name: 'WIP',
            data: barChartWIP.length > 0 ? barChartWIP : [],
        },
        {
            name: 'Closed',
            data: barChartClosed.length > 0 ? barChartClosed : [],
        },
    ], [barChartOpen, barChartWIP, barChartClosed]);

    const options = useMemo(() => {
        if (frequency == 'Monthly') {
            return {
                chart: {
                    type: 'bar',
                    height: 380,
                    stacked: true,
                },
                xaxis: {
                    categories: months.length > 0 ? months : [],
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
        } else if (frequency == 'Yearly') {
            return {
                chart: {
                    type: 'bar',
                    height: 380,
                    stacked: true,
                },
                xaxis: {
                    categories: [2024],
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
        } else {
            return {
                chart: {
                    type: 'bar',
                    height: 380,
                    stacked: true,
                },
                xaxis: {
                    categories: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
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
        }
    }, [barChartOpen, barChartWIP, barChartClosed]);

    return (
        <Charts options={options} type="bar" series={series} height={height} />
    );
};