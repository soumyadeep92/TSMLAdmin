import React from "react";
import Chart from "react-apexcharts";

export default function AphexChart() {
  const data = [
    {
      name: "Natural",
      quantity: 5
    },
    {
      name: "Industrial",
      quantity: 26
    },
    {
      name: "Infrastructure",
      quantity: 2
    },
    {
      name: "Pollution",
      quantity: 9
    }
  ];

  let names = [];
  let quantities = [];
  data.forEach(function (n) {
    names.push(n.name);
    quantities.push(n.quantity);
  });

  return React.createElement(Chart, {
    type: "pie",
    series: quantities,
    labels: {
      show: false,
      name: {
        show: true
      }
    },
    options: {
      labels: names,
      legend: {
        show: true,
        position: "bottom"
      },
      colors: ["#00AB55", "#2D99FF", "#FFE700", "#826AF9"]
    }
  });
}
