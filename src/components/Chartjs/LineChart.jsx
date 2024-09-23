import { useState } from 'react';
import { Charts } from './Charts';
import * as dayjs from "dayjs";
import * as moment from 'moment';

export const LineChart = () => {

    const [height] = useState(350);
    const [width] = useState(580);
    const [series] = useState([{
        name: "Desktops",
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
    <Charts options={options} type="line" series={series} width={width} height={height} />
  );
}