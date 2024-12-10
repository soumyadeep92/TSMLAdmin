import React, { useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment'
import { dashboardAreaResults } from '../../apis/apis'
import { useEffect } from 'react';

export const AreaChart = ({ chartType = "monthly", companyArr = [] }) => {

    const [resultsAreaMonthly, setResultsAreaMonthly] = useState([])
    const [resultsAreaLabelsMonthly, setResultsAreaLabelsMonthly] = useState([])
    const [resultsAreaWeekly, setResultsAreaWeekly] = useState([])
    const [resultsAreaLabelsWeekly, setResultsAreaLabelsWeekly] = useState([])
    const [resultsAreaDaily, setResultsAreaDaily] = useState([])
    const [resultsAreaLabelsDaily, setResultsAreaLabelsDaily] = useState([])
    const [resultsAreaQuarterly, setResultsAreaQuarterly] = useState([])
    const [resultsAreaLabelsQuarterly, setResultsAreaLabelsQuarterly] = useState([])
    const [area, setArea] = useState({})
    const [results, setResults] = useState([])
    const [resultsLabel, setResultsLabel] = useState([])
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('user')).user_role_id != 1) {
            dashboardAreaResults().then(res => {
                setArea(res.response.data)
                setResultsAreaMonthly(res.response.data.cvrMonthlyArr)
                setResultsAreaLabelsMonthly(res.response.data.cvrMonthlyDateArr)
                setResultsAreaWeekly(res.response.data.cvrWeeklyArr)
                setResultsAreaLabelsWeekly(res.response.data.cvrWeeklyDateArr)
                setResultsAreaQuarterly(res.response.data.cvrQuarterlyArr)
                setResultsAreaLabelsQuarterly(res.response.data.cvrQuarterlyDateArr)
                setResultsAreaDaily(res.response.data.cvrDailyArr)
                setResultsAreaLabelsDaily(res.response.data.cvrDailyDateArr)
            })
        } else {
        }
    }, [chartType])

    const optionsSuper = useMemo(() => {
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
                categories: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                labels: {
                    show: true,
                    formatter: function (value) {
                        return value || '';
                    }
                },
            },
            tooltip: {
                x: {
                    format: 'MMM yyyy',
                },
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
        };
    }, []);

    const seriesSuper = useMemo(() => {
        if (!Array.isArray(companyArr) || companyArr.length === 0) {
            return []
        };
        return companyArr.map((dataset) => ({
            name: dataset.name,
            data: dataset.data,
        }));
    }, [companyArr]);

    const options = useMemo(() => {
        let resultsArea = resultsAreaMonthly;
        let dateFormat = 'MMM yyyy';
        let categories = resultsAreaLabelsMonthly;
        if (chartType === 'weekly') {
            dateFormat = 'MMM dd, yyyy';
            resultsArea = resultsAreaWeekly;
            categories = resultsAreaLabelsWeekly;
            setResults(resultsArea)
            setResultsLabel(categories)
        }

        else if (chartType === 'daily') {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            const filteredData = resultsAreaLabelsDaily.reduce((acc, date, index) => {
                const currentDate = new Date(date);
                if (currentDate.getMonth() === currentMonth && currentDate.getFullYear() === currentYear) {
                    let start_date = moment().subtract(15, 'days');
                    let end_date = moment()
                    let currentDateFix = moment(date)
                    if (currentDateFix >= start_date && currentDateFix <= end_date) {
                        acc.push({
                            date: date,
                            value: resultsAreaDaily[index],
                        });
                    }
                }
                return acc;
            }, []);

            categories = filteredData.map(item => item.date);
            resultsArea = filteredData.map(item => item.value);
            setResults(resultsArea)
            setResultsLabel(categories)
        }

        else if (chartType === 'quarterly') {
            dateFormat = 'MM yyyy';
            categories = resultsAreaLabelsQuarterly.map(date => {
                const currentDate = new Date();
                return `${date} ${currentDate.getFullYear()}`;
            });

            categories = [...new Set(categories)];
            resultsArea = resultsAreaQuarterly
            setResults(resultsArea)
            setResultsLabel(categories)
        }
        else if (chartType === 'monthly') {
            resultsArea = resultsAreaMonthly
            categories = resultsAreaLabelsMonthly
            setResults(resultsArea)
            setResultsLabel(categories)
        }
        else {
            resultsArea = resultsAreaMonthly
            categories = resultsAreaLabelsMonthly
            setResults(resultsArea)
            setResultsLabel(categories)
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
                categories: categories,
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
        };
    }, [area.id, chartType]);

    const series = useMemo(() => [{
        name: 'Series 1',
        data: results,
    }], [results]);

    if (JSON.parse(localStorage.getItem('user')).user_role_id != 1) {
        return (
            <div id="chart">
                <ReactApexChart options={options} series={series} type="area" height={350} />
            </div>
        );
    }
    else {
        return (
            <div id="chart">
                <ReactApexChart options={optionsSuper} series={seriesSuper} type="area" height={350} />
            </div>
        );
    }
}

// import React, { useState } from 'react';
// import { Charts } from './Charts';
// //import * as dayjs from "dayjs";
// //import * as moment from 'moment';

// export const AreaChart = () => {

//     const [height] = useState(350);

//     const [series] = useState([{
//         name: "CVR",
//         data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
//     }]);
//     const [options] = useState({
//         chart: {
//             height: 350,
//             type: 'area',
//             zoom: {
//                 enabled: false
//             }
//         },
//         dataLabels: {
//             enabled: false
//         },
//         stroke: {
//             curve: 'straight'
//         },
//         grid: {
//             row: {
//                 colors: ['#f3f3f3', 'transparent'],
//                 opacity: 0.5
//             },
//         },
//         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
//         xaxis: {
//             type: 'string',
//         },
//         yaxis: {
//             opposite: true
//         },
//         legend: {
//             horizontalAlign: 'left'
//         },
//         responsive: [
//             {
//                 breakpoint: 800,
//                 options: {
//                     chart: {
//                         width: 300,
//                     },
//                     legend: {
//                         position: 'bottom',
//                     },
//                 },

//             },

//         ],
//     });

//     return (
//         <Charts options={options} type="area" series={series} height={height} />
//     );
// }

