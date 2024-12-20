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
import fetchWithAuth from '../fetchWithAuth';
import Select from 'react-select'
import { getDashboard, listAllCompanies, getSuperadminDashboard, getSuperadminAreaChart } from '../apis/apis';
import { Loader } from '../layout/Loader';

const Dashboard = () => {
    const [results, setResults] = useState({})
    const [selectedFrequency, setSelectedFrequency] = useState('Please select frequency');
    const [chartType, setChartType] = useState('')
    const [barType, setBarType] = useState('')
    const [body, setBody] = useState({ status_arr: [], frequency: '' })
    const [status, setStatus] = useState([])
    const [frequency, setFrequency] = useState('')
    const [superadminRes, setSuperadminRes] = useState({})
    const [companyArr, setCompanyArr] = useState([{ label: '', value: '', isdisabled: '' }])
    const [areaSuperData, setAreaSuperData] = useState({});
    const [loading, setLoading] = useState(true);
    const options = [
        // { value: 'All', label: 'All' },
        { value: 'Open', label: 'Open' },
        { value: 'WIP', label: 'WIP' },
        { value: 'Closed', label: 'Closed' }
    ]

    const handleChange = (data) => {
        data = data.map(obj => obj['value'])
        setStatus(data)
    }

    const handleSubmit = async () => {
        if (JSON.parse(localStorage.getItem('user')).user_role_id != 1) {
            const body = {
                status_arr: status,
                frequency: frequency
            }
            setBody(body)
        } else {
            const body = { "company_arr": status }
            getSuperadminAreaChart(body).then(res => {
                setAreaSuperData(res.response.data)
            })
        }
    }

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('user')).user_role_id != 1) {
            setTimeout(() => {
                getDashboard().then(res => {
                    setResults(res.response.data)
                    setLoading(false)
                })
            }, 5000)
        } else {
            setTimeout(() => {
                getSuperadminDashboard().then(res => {
                    setSuperadminRes(res.response.data)
                })
                listAllCompanies().then(res => {
                    let optionsCompany = res.response.companyDetails.map(obj => { return { "label": obj.company_name, "value": obj.company_name, "isdisabled": false } })
                    setCompanyArr(optionsCompany)
                })
                setLoading(false)
            }, 3000)
        }
    }, [results.id])
    useEffect(() => {
        if (status.length >= 5) {
            setCompanyArr((prev) =>
                prev.map((company) => ({
                    ...company,
                    isdisabled: true
                }))
            );
        } else {
            setCompanyArr((prev) =>
                prev.map((company) => ({
                    ...company,
                    isdisabled: false
                }))
            );
        }
    }, [areaSuperData, status])
    return (
        <>
            {loading ? (
                <>
                    <Loader />
                </>) :
                <></>
            }
            <AdminLayout>
                <Container fluid="true">
                    {JSON.parse(localStorage.getItem('user')).user_role_id != 1 ? (
                        <>
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
                                                        {selectedFrequency}
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="#/year" onClick={() => { setChartType('quarterly'); setSelectedFrequency('Quarter'); }}>Quarter</Dropdown.Item>
                                                        <Dropdown.Item href="#/month" onClick={() => { setChartType('monthly'); setSelectedFrequency('Month'); }}>Month</Dropdown.Item>
                                                        <Dropdown.Item href="#/week" onClick={() => { setChartType('weekly'); setSelectedFrequency('Week'); }}>Week</Dropdown.Item>
                                                        <Dropdown.Item href="#/day" onClick={() => { setChartType('daily'); setSelectedFrequency('Day'); }}>Day</Dropdown.Item>
                                                    </Dropdown.Menu>

                                                </Dropdown>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <AreaChart chartType={chartType} />
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
                                            
                                            <Col xs={12} lg={4}>
                                                <div className="d-flex gap-2">
                                                <Select
                                                    isMulti
                                                    name="colors"
                                                    options={options}
                                                    className="basic-multi-select w-100"
                                                    classNamePrefix="select"
                                                    onChange={(data) => {
                                                        data = data.map(obj => obj['value'])
                                                        setStatus(data)
                                                    }}
                                                />
                                                
                                                </div>
                                            </Col>
                                            <Col xs={12} lg={3}>
                                                <Dropdown data-bs-theme="dark" className="w_100">
                                                    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                                        {frequency ? frequency : 'Please select frequency'}
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="#/year" onClick={() => { setFrequency('Yearly'); }}>Year</Dropdown.Item>
                                                        <Dropdown.Item href="#/month" onClick={() => { setFrequency('Monthly'); }}>Month</Dropdown.Item>
                                                    </Dropdown.Menu>

                                                </Dropdown>
                                            </Col>
                                            <Col xs={12} lg={2}>
                                            <Button onClick={handleSubmit}>Submit</Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <BarChart bodyReq={body} frequency={frequency} />
                                        </Row>
                                    </Card>
                                </Col>
                            </Row>
                        </>)
                        :
                        <>
                            <Row style={rowStyle}>
                                <Col xs={12} sm={6} lg={3} className='mb-4 mb-lg-0'>
                                    <Card style={cardStyle}>
                                        <div style={shape}>
                                            <Card.Img style={images} src="/images/hourglass-end.png" />
                                        </div>
                                        <div style={shapeSide}>
                                            <p className='mb-0' style={opNumber}>{superadminRes?.totalCompaniesCount}</p>
                                            <span style={openPoint}>Companies</span><br />
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
                                            <p className='mb-0' style={opNumber}>{superadminRes?.cvrsCount}</p>
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
                                            <p className='mb-0' style={opNumber}>{superadminRes?.totalAdminCount}</p>
                                            <span style={openPoint}>Admins</span><br />
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
                                            <p className='mb-0' style={opNumber}>{superadminRes?.cvrsWipCount}</p>
                                            <span style={openPoint}>CVRs WIP</span><br />
                                            {/* <span style={lastMonth}><span style={lmNumber}>80</span> Last Month</span> */}
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                            <Row style={rowStyle}>
                                <Col xs={12} >
                                    <Card>
                                        <Row className='p-3'>
                                            <Col xs={12} lg={3}>
                                                <span style={textStyle}>Company Wise CVR</span>
                                            </Col>
                                            <Col xs={12} lg={6}>
                                                <Select
                                                    isMulti
                                                    name="colors"
                                                    options={companyArr}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    isOptionDisabled={(option) => option.isdisabled}
                                                    onChange={(data) => {
                                                        data = data.map(obj => obj['value'])
                                                        setStatus(data)
                                                    }}
                                                />
                                            </Col>
                                            <Col xs={12} lg={3}>
                                                <Button onClick={handleSubmit}>Submit</Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <AreaChart companyArr={areaSuperData} />
                                        </Row>
                                    </Card>
                                </Col>
                            </Row>
                        </>}
                </Container>
            </AdminLayout>
        </>
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
