import React from "react";
import Chart from "react-apexcharts";
import ApexCharts from 'apexcharts'
export default function AreaChart() {

    return React.createElement(ApexCharts, {
        series: [{
            name: "STOCK ABC",
            data: [1,2]
          }],
            chart: {
            type: 'area',
            height: 350,
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
            text: 'Fundamental Analysis of Stocks',
            align: 'left'
          },
          subtitle: {
            text: 'Price Movements',
            align: 'left'
          },
          labels: ['jdjd','jdjd'],
          xaxis: {
            type: 'datetime',
          },
          yaxis: {
            opposite: true
          },
          legend: {
            horizontalAlign: 'left'
          }
      });

}

