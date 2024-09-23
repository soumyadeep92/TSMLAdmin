import React, { useState } from "react";
import * as dayjs from "dayjs";
import * as moment from 'moment';
import { PieChart } from './Chartjs/PieChart';
import { LineChart } from "./Chartjs/LineChart";
import { BarChart } from "./Chartjs/BarChart";
import { Image, Container, Row, Col, Form, InputGroup, Card, Dropdown } from 'react-bootstrap';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Dashboard = () => {

    return (
        <>
            <Container fluid="true">
                <div>
                <Row style={rowStyle}>
                    <Col>
                        <Card style={cardStyle}>
                            <div style={shape}>
                                <Card.Img style={images} src="/images/hourglass-end.png" />
                            </div>
                            <div style={shapeSide}>
                                <p>200</p>
                                <span>Open Pints</span>
                                <p>200 Last Month</p>
                            </div>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={cardStyle}>
                            <div style={shape}>
                                <Card.Img style={images} src="/images/assept-document.png" />
                            </div>
                            <div style={shapeSide}>
                                <p>200</p>
                                <span>Open Pints</span>
                                <p>200 Last Month</p>
                            </div>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={cardStyle}>
                            <div style={shape}>
                                <Card.Img style={images} src="/images/file.png" />
                            </div>
                            <div style={shapeSide}>
                                <p>200</p>
                                <span>Open Pints</span>
                                <p>200 Last Month</p>
                            </div>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={cardStyle}>
                            <div style={shape}>
                                <Card.Img style={images} src="/images/meeting.png" />
                            </div>
                            <div style={shapeSide}>
                                <p>200</p>
                                <span>Open Pints</span>
                                <p>200 Last Month</p>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row style={rowStyle}>
                    <Col sm={5}>
                        <Card style={{ height: '100%' }}>
                            <Row style={{ margin: '10px' }}>
                                <Col><span style={textStyle}>CAM Wise CVR</span></Col>
                                <Col sm={5}>
                                    <Dropdown data-bs-theme="dark">
                                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                            Dropdown Button
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/year">Year</Dropdown.Item>
                                            <Dropdown.Item href="#/month">Month</Dropdown.Item>
                                            <Dropdown.Item href="#/week">Week</Dropdown.Item>
                                            <Dropdown.Item href="#/day">Day</Dropdown.Item>
                                        </Dropdown.Menu>

                                    </Dropdown>
                                </Col>
                            </Row>
                            <Row style={{ margin: '10px' }}>
                                <PieChart />
                            </Row>
                        </Card>
                    </Col>
                    <Col sm={7} style={{ height: '100%' }}>
                        <Card>
                            <Row style={{ margin: '10px' }}>
                                <Col sm={6}><span style={textStyle}>CVR</span></Col>
                                <Col sm={6} style={{paddingLeft:'140px'}}>
                                    <Dropdown data-bs-theme="dark">
                                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                            Dropdown Button
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/year">Year</Dropdown.Item>
                                            <Dropdown.Item href="#/month">Month</Dropdown.Item>
                                            <Dropdown.Item href="#/week">Week</Dropdown.Item>
                                            <Dropdown.Item href="#/day">Day</Dropdown.Item>
                                        </Dropdown.Menu>

                                    </Dropdown>
                                </Col>
                            </Row>
                            <Row style={{ margin: '10px' }}>
                                <LineChart />
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row style={rowStyle}>
                    <Col >
                        <Card>
                            <Row style={{ margin: '20px' }}>
                                <Col sm={3}>
                                <span style={textStyle}>Customer Wise CVR</span>
                                </Col>       
                                <Col sm={7} style={{paddingLeft:'400px'}}>
                                    <InputGroup className="mb-3">
                                        <Form.Control placeholder="Search Here" />
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faSearch} />
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Col>
                                <Col sm={2}>
                                    <Dropdown data-bs-theme="dark">
                                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                            Dropdown Button
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/year">Year</Dropdown.Item>
                                            <Dropdown.Item href="#/month">Month</Dropdown.Item>
                                            <Dropdown.Item href="#/week">Week</Dropdown.Item>
                                            <Dropdown.Item href="#/day">Day</Dropdown.Item>
                                        </Dropdown.Menu>

                                    </Dropdown>
                                </Col>
                            </Row>
                            <Row style={{ margin: '10px' }}>
                                <BarChart />
                            </Row>
                        </Card>
                    </Col>
                </Row>
                </div>
            </Container>
        </>
    );
}
const textStyle = {
	fontWeight: 'bold', 
	fontSize: '24px'
}
const rowStyle = {
    width: '87%',
    marginLeft: '135px',
    marginTop: '40px'
}
const cardStyle = {
    flexDirection: 'row'
}
const shapeSide = {
    width: '70%',
    marginTop: '15px'
}
const images = {
    display: 'block',
    height: '53px',
    width: '81%',
    margin: '8px'
}
const shape = {
    width: '90px',
    height: '75px',
    margin: '19px',
    borderRadius: '46%',
    backgroundColor: '#E5EBFF'
}