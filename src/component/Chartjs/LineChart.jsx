import React, { useState } from 'react';
import { Charts } from './Charts';
import * as dayjs from "dayjs";
import * as moment from 'moment';
import { useSelector } from 'react-redux';

export const LineChart = () => {

    const isToggled = useSelector((state) => state.toggle.isToggled);

    const [height] = useState(350);

    const [series] = useState([{
        name: "CVR",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }]);
    const [options] = useState({
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
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        }
    });

  return (
    <Charts options={options} type="line" series={series} width={isToggled==true?640:540} height={height} />
  );
}