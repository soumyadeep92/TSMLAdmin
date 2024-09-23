import React from 'react';
import ReactApexChart from 'react-apexcharts';

export const Charts = (props) => {

    return (
        <div>
            <div id="chart">
                <ReactApexChart
                    options={props.options}
                    series={props.series}
                    type={props.type}
                    width={"380"}
                />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};