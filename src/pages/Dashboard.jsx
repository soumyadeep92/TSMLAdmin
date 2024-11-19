import React, { useEffect, useState } from "react";
import AdminLayout from '../layout/AdminLayout'
//import * as dayjs from "dayjs";
//import * as moment from 'moment';
import { PieChart } from '../component/Chartjs/PieChart';
import { BarChart } from "../component/Chartjs/BarChart";
import { Container, Row, Col, Form, InputGroup, Card, Dropdown, Button } from 'react-bootstrap';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AreaChart } from '../component/Chartjs/AreaChart';
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_API_URL } from '../constant';
import fetchWithAuth from '../fetchWithAuth';
import Select from 'react-select'
import { getDashboard } from '../apis/apis'

const Dashboard = () => {
    const [results, setResults] = useState({})
    const [resultsArea, setResultsArea] = useState([])
    const [resultsOpenBar, setResultsOpenBar] = useState([])
    const [resultsWIPBar, setResultsWIPBar] = useState([])
    const [resultsClosedBar, setResultsClosedBar] = useState([])
    const [resultsAreaLabels, setResultsAreaLabels] = useState([])
    const [chartType, setChartType] = useState('')
    const [barType, setBarType] = useState('')
    const options = [
        { value: 'All', label: 'All' },
        { value: 'Open', label: 'Open' },
        { value: 'WIP', label: 'WIP' },
        { value: 'Closed', label: 'Closed' }
    ]

    const handleChange = (data) => {
        console.log(data)
    }

    useEffect(() => {
        getDashboard().then(res => {
            setResults(res.response.data)
            setResultsArea(res.response.data.cvrMonthlyArr)
            setResultsAreaLabels(res.response.data.cvrMonthlyDateArr)
        })
    }, [results.id])
    return (
        <AdminLayout>
            <Container fluid="true">
                <Row style={rowStyle}>
                    <Col xs={12} sm={6} lg={3} className='mb-4 mb-lg-0'>
                        <Card style={cardStyle}>
                            <div style={shape}>
                                <Card.Img style={images} src="/images/hourglass-end.png" />
                            </div>
                            <div style={shapeSide}>
                                <p className='mb-0' style={opNumber}>{results?.customerDetails}</p>
                                <span style={openPoint}>Customers</span><br />
                                {/* <span style={lastMonth}><span style={lmNumber}>50</span> Last Month</span> */}
                            </div>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6} lg={3} className='mb-4 mb-lg-0'>
                        <Card style={cardStyle}>
                            <div style={shape}>
                                <Card.Img style={images} src="/images/assept-document.png" />
                            </div>
                            <div style={shapeSide}>
                                <p className='mb-0' style={opNumber}>{results?.cvrDetails}</p>
                                <span style={openPoint}>CVRs</span><br />
                                {/* <span style={lastMonth}><span style={lmNumber}>20</span> Last Month</span> */}
                            </div>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6} lg={3} className='mb-4 mb-lg-0'>
                        <Card style={cardStyle}>
                            <div style={shape}>
                                <Card.Img style={images} src="/images/file.png" />
                            </div>
                            <div style={shapeSide}>
                                <p className='mb-0' style={opNumber}>{results?.userDetails}</p>
                                <span style={openPoint}>Users</span><br />
                                {/* <span style={lastMonth}><span style={lmNumber}>22</span> Last Month</span> */}
                            </div>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6} lg={3} className='mb-4 mb-lg-0'>
                        <Card style={cardStyle}>
                            <div style={shape}>
                                <Card.Img style={images} src="/images/meeting.png" />
                            </div>
                            <div style={shapeSide}>
                                <p className='mb-0' style={opNumber}>{results?.cvrWIPDetails}</p>
                                <span style={openPoint}>CVRs WIP</span><br />
                                {/* <span style={lastMonth}><span style={lmNumber}>80</span> Last Month</span> */}
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row style={rowStyle}>
                    <Col xs={12} lg={5}>
                        <Card style={{ height: '100%' }}>
                            <Row style={{ margin: '10px' }}>
                                <Col sm={6}><span style={textStyle}>Customer Type Wise CVR</span></Col>
                                <Col sm={6} style={{ textAlign: "right" }}>
                                </Col>
                            </Row>
                            <Row style={{ margin: '10px' }}>
                                <PieChart pieResults={results?.customerTypeCVRArr} pieLabels={results?.customerTypeArr} />
                            </Row>
                        </Card>
                    </Col>
                    <Col xs={12} lg={7} style={{ height: '100%' }}>
                        <Card>
                            <Row style={{ margin: '10px' }}>
                                <Col sm={6}><span style={textStyle}>CVR</span></Col>
                                <Col sm={6} style={{ textAlign: "right" }}>

                                    <Dropdown data-bs-theme="dark">
                                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                            Please select frequency
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/year" onClick={() => { setResultsArea(results?.cvrQuarterlyArr); setResultsAreaLabels(results?.cvrQuarterlyDateArr); setChartType('quarterly'); }}>Quarter</Dropdown.Item>
                                            <Dropdown.Item href="#/month" onClick={() => { setResultsArea(results?.cvrMonthlyArr); setResultsAreaLabels(results?.cvrMonthlyDateArr); setChartType('monthly'); }}>Month</Dropdown.Item>
                                            <Dropdown.Item href="#/week" onClick={() => { setResultsArea(results?.cvrWeeklyArr); setResultsAreaLabels(results?.cvrWeeklyDateArr); setChartType('weekly'); }}>Week</Dropdown.Item>
                                            <Dropdown.Item href="#/day" onClick={() => { setResultsArea(results?.cvrDailyArr); setResultsAreaLabels(results?.cvrDailyDateArr); setChartType('daily'); }}>Day</Dropdown.Item>
                                        </Dropdown.Menu>

                                    </Dropdown>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <AreaChart resultsArea={resultsArea} resultsAreaLabels={resultsAreaLabels} chartType={chartType} />
                                </Col>

                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row style={rowStyle}>
                    <Col xs={12} >
                        <Card>
                            <Row className='p-3'>
                                <Col xs={12} lg={3}>
                                    <span style={textStyle}>Status Wise CVR</span>
                                </Col>
                                <Col md></Col>
                                <Col xs={12} lg={3}>
                                    {/* <Dropdown data-bs-theme="dark">
                                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary"
                                            className='w-100'>
                                            Status
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/all" onClick={() => { setResultsOpenBar(results?.openCVRArr); setResultsWIPBar(results?.WIPCVRArr); setResultsClosedBar(results?.closedCVRArr); setBarType('All'); }}>All</Dropdown.Item>
                                            <Dropdown.Item href="#/open" onClick={() => { setResultsOpenBar(results?.openCVRArr); setResultsWIPBar([]); setResultsClosedBar([]); setBarType('Open'); }}>Open</Dropdown.Item>
                                            <Dropdown.Item href="#/wip" onClick={() => { setResultsWIPBar(results?.WIPCVRArr); setResultsOpenBar([]); setResultsClosedBar([]); setBarType('WIP'); }}>WIP</Dropdown.Item>
                                            <Dropdown.Item href="#/closed" onClick={() => { setResultsClosedBar(results?.closedCVRArr); setResultsWIPBar([]); setResultsOpenBar([]); setBarType('Closed'); }}>Closed</Dropdown.Item>
                                        </Dropdown.Menu>

                                    </Dropdown> */}
                                    <Select
                                        isMulti
                                        name="colors"
                                        options={options}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col xs={12} lg={3}>
                                    <Dropdown data-bs-theme="dark">
                                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary"
                                            className='w-100'>
                                            Please select frequency
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/year">Year</Dropdown.Item>
                                            <Dropdown.Item href="#/month">Month</Dropdown.Item>
                                        </Dropdown.Menu>

                                    </Dropdown>
                                </Col>
                            </Row>
                            <Row>
                                <Col md></Col>
                                <Col xs={10} lg={6}>
                                    <Button>Submit</Button>
                                </Col>
                            </Row>
                            <Row>
                                <BarChart barOpenResults={resultsOpenBar} barWIPResults={resultsWIPBar} barClosedResults={resultsClosedBar} barType={barType} />
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </AdminLayout>
    )
}

export default Dashboard

const opNumber = {
    fontWeight: '700',
    fontSize: '20px'
}
const openPoint = {
    color: '#C5C4C4'
}
const lastMonth = {

}
const lmNumber = {
    color: '#45B369'
}
const textStyle = {
    fontWeight: 'bold',
    fontSize: '21px'
}
const rowStyle = {
    marginTop: '40px'
}
const cardStyle = {
    flexDirection: 'row'
}
const shapeSide = {
    width: '85%',
    marginTop: '15px'
}
const images = {
    display: 'block',
    height: '35px',
    width: '60%',
    margin: '13px'
}
const shape = {
    width: '102px',
    height: '64px',
    margin: '19px',
    borderRadius: '46%',
    backgroundColor: '#E5EBFF'
}