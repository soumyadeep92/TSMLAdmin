import React, { useState } from "react";
import { Charts } from './Charts';
import * as dayjs from "dayjs";
import * as moment from 'moment';

export const Dashboard = () => {
    const [seriesPie] = useState([44, 55, 13, 43, 22]);
    const [optionsPie] = useState({
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
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
    });
    const [seriesArea] = useState([{
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }]);
    const [optionsArea] = useState({
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Product Trends by Month',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        }
    });
    const [seriesBar] = useState([{
        name: "sales",
        data: [{
            x: '2019/01/01',
            y: 400
        }, {
            x: '2019/04/01',
            y: 430
        }, {
            x: '2019/07/01',
            y: 448
        }, {
            x: '2019/10/01',
            y: 470
        }, {
            x: '2020/01/01',
            y: 540
        }, {
            x: '2020/04/01',
            y: 580
        }, {
            x: '2020/07/01',
            y: 690
        }, {
            x: '2020/10/01',
            y: 690
        }]
    }]);
    const [optionsBar] = useState({
        chart: {
            type: 'bar',
            height: 380
        },
        xaxis: {
            type: 'y',
            labels: {
                formatter: function (val) {
                    return "Q" + moment(val).quarter()
                }
            },
            group: {
                style: {
                    fontSize: '10px',
                    fontWeight: 700
                },
                groups: [
                    { title: '2019', cols: 4 },
                    { title: '2020', cols: 4 }
                ]
            }
        },
        title: {
            text: 'Grouped Labels on the X-axis',
        },
        tooltip: {
            x: {
                formatter: function (val) {
                    return "Q" + moment(val).quarter() + " " + moment(val).format("YYYY")
                }
            }
        },
    },
    );
    return (
        <>
            <Charts options={optionsPie} type="pie" series={seriesPie} />
            <Charts options={optionsArea} type="line" series={seriesArea} />
            <Charts options={optionsBar} type="bar" series={seriesBar} />
        </>
    );
}