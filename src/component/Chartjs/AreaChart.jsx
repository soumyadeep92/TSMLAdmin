import React, { useState } from 'react';
import { Charts } from './Charts';
//import * as dayjs from "dayjs";
//import * as moment from 'moment';
import { useSelector } from 'react-redux';

export const AreaChart = () => {

    const isToggled = useSelector((state) => state.toggle.isToggled);

    const [height] = useState(350);

    const [series] = useState([{
        name: "CVR",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }]);
    const [options] = useState({
        chart: {
            height: 350,
            type: 'area',
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
        // title: {
        //     text: 'CVR',
        //     align: 'left'
        // },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        xaxis: {
            type: 'string',
        },
        yaxis: {
            opposite: true
        },
        legend: {
        horizontalAlign: 'left'
        },
        responsive: [
            {
                breakpoint: 800,
                options: {
                    chart: {
                        width: 300,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
                
            },
            
        ],
    });

  return (
    <Charts options={options} type="area" series={series} height={height} />
  );
}