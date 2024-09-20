// import React from "react";
// import { Dropdown, Container, Row, Col, Button, Card } from 'react-bootstrap';
// import PieCharts from "./pieChart.js";
// import AreaCharts from "./areaChart.js";

// export const Dashboard = () => {
//     const points = [
//         { x: 0, y: 100 },
//         { x: 20, y: 20 },
//         { x: 40, y: 50 },
//         { x: 60, y: 20 },
//         { x: 80, y: 50 },
//         { x: 100, y: 20 }
//       ];
//     return (
//         <>
//             <Container fluid="true">
//                 <Row style={rowStyle}>
//                     <Col>
//                         <Card style={cardStyle}>
//                             <div style={shape}>
//                                 <Card.Img style={images} src="/images/hourglass-end.png" />
//                             </div>
//                             <div style={shapeSide}>
//                                 <p>200</p>
//                                 <span>Open Pints</span>
//                                 <p>200 Last Month</p>
//                             </div>
//                         </Card>
//                     </Col>
//                     <Col>
//                         <Card style={cardStyle}>
//                             <div style={shape}>
//                                 <Card.Img style={images} src="/images/assept-document.png" />
//                             </div>
//                             <div style={shapeSide}>
//                                 <p>200</p>
//                                 <span>Open Pints</span>
//                                 <p>200 Last Month</p>
//                             </div>
//                         </Card>
//                     </Col>
//                     <Col>
//                         <Card style={cardStyle}>
//                             <div style={shape}>
//                                 <Card.Img style={images} src="/images/file.png" />
//                             </div>
//                             <div style={shapeSide}>
//                                 <p>200</p>
//                                 <span>Open Pints</span>
//                                 <p>200 Last Month</p>
//                             </div>
//                         </Card>
//                     </Col>
//                     <Col>
//                         <Card style={cardStyle}>
//                             <div style={shape}>
//                                 <Card.Img style={images} src="/images/meeting.png" />
//                             </div>
//                             <div style={shapeSide}>
//                                 <p>200</p>
//                                 <span>Open Pints</span>
//                                 <p>200 Last Month</p>
//                             </div>
//                         </Card>
//                     </Col>
//                 </Row>
//                 <Row style={rowStyle}>
//                     <Col sm={5}>
//                         <Card >
//                             <Row style={{margin:'10px'}}>
//                                 <Col><span style={{fontWeight:'bold',fontSize:'24px'}}>CAM Wise CVR</span></Col>
//                                 <Col sm={5}>
//                                     <Dropdown data-bs-theme="dark">
//                                         <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
//                                             Dropdown Button
//                                         </Dropdown.Toggle>

//                                         <Dropdown.Menu>
//                                             <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
//                                             <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
//                                             <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
//                                             <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
//                                         </Dropdown.Menu>

//                                     </Dropdown>
//                                 </Col>
//                             </Row>
//                             <div>
//                                 <PieCharts />
//                             </div>
//                         </Card>
//                     </Col>
//                     <Col sm={7}>
//                         <Card style={cardStyle}>
//                             <Row style={{margin:'10px'}}>
//                             <AreaCharts />
//                             </Row>
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </>
//     );
// }
// const rowStyle = {
//     width: '87%',
//     marginLeft: '135px',
//     marginTop: '40px'
// }
// const cardStyle = {
//     flexDirection: 'row'
// }
// const shapeSide = {
//     width: '70%',
//     marginTop: '15px'
// }
// const images = {
//     display: 'block',
//     height: '53px',
//     width: '81%',
//     margin: '8px'
// }
// const shape = {
//     width: '90px',
//     height: '75px',
//     margin: '19px',
//     borderRadius: '46%',
//     backgroundColor: '#E5EBFF'
// }