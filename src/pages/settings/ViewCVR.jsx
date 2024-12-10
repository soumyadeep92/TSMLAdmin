import React, { useState, useEffect } from "react";
import AdminLayout from '../../layout/AdminLayout';
import { Container, Row, Col, Form, Button, InputGroup, Image } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import fetchWithAuth from '../../fetchWithAuth';
import { viewCVRById } from '../../apis/apis'

export const ViewCVR = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [state, setState] = useState({ id: "", cvrDetails: {}, customerDetails: {}, company_representatives: [], reasons_not_buying: {}, requirement_details: {}, issue_resolutions: [], customer_feedbacks: [] });

    useEffect(() => {
        viewCVRById(id).then(res => {
            setState(res.response.data)
        }).catch(err => {

        })
    }, [state.id])
    const handleNavigate = () => {
        navigate('/cvr-time-schedule')
    }
    return (
        <AdminLayout>
            <Container fluid="true">
                <Row>
                    <Col sm={3}><p className='page_left_panel'>View CVR</p></Col>
                    <Col sm={5}></Col>
                    <Col sm={4}><p className='page_right_panel'><span style={{ cursor: 'pointer' }} onClick={handleNavigate}>CVR Schedule</span> / View CVR</p></Col>
                </Row>
                <Row style={{ backgroundColor: 'white', borderRadius: '1%', margin: '2px 1px' }}>
                    <Form style={{ padding: '25px 20px 25px 25px' }}>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>CVR Code</Form.Label>
                                <Form.Control defaultValue={state.cvrDetails.cvr_code} type="text" disabled />
                            </Col>
                            <Col md>
                                <Form.Label>CVR Mode</Form.Label>
                                <Form.Control defaultValue={state.cvrDetails.cvr_mode} type="text" disabled />
                            </Col>
                        </Row>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>CVR Status</Form.Label>
                                <Form.Control defaultValue={state.cvrDetails.cvr_status} type="text" disabled />
                            </Col>
                            <Col md>
                                <Form.Label>Check-in Date</Form.Label>
                                <Form.Control defaultValue={state.cvrDetails.check_in_date} type="text" disabled />
                            </Col>
                        </Row>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>Check-out Date</Form.Label>
                                <Form.Control defaultValue={state.cvrDetails.check_out_date} type="text" disabled />
                            </Col>
                            <Col md>
                                <Form.Label>Check-in Pic</Form.Label>
                                <Form.Control defaultValue={state.cvrDetails.check_in_pic_url} type="text" disabled />
                                <Image src={state.cvrDetails.check_in_pic_url} style={{ width: '80px' }} />
                            </Col>
                        </Row>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>Check-out Pic</Form.Label>
                                <Form.Control defaultValue={state.cvrDetails.checkout_pic_url} type="text" disabled />
                                <Image src={state.cvrDetails.checkout_pic_url} style={{ width: '80px' }} />
                            </Col>
                            <Col md>
                                <Form.Label>Platform Link</Form.Label>
                                <Form.Control defaultValue={state.cvrDetails.platform_link} type="text" disabled />
                            </Col>
                        </Row>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>Business Nature</Form.Label>
                                <Form.Control defaultValue={state.customerDetails.business_nature} type="text" disabled />
                            </Col>
                            <Col md>
                                <Form.Label>Company Address</Form.Label>
                                <Form.Control defaultValue={state.customerDetails.company_address} type="text" disabled />
                            </Col>
                        </Row>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>Plant Address</Form.Label>
                                <Form.Control defaultValue={state.customerDetails.plant_address} type="text" disabled />
                            </Col>
                            <Col md>
                                <Form.Label>Representative Name</Form.Label>
                                <Form.Control defaultValue={state.customerDetails.representative_name} type="text" disabled />
                            </Col>
                        </Row>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>GSTN</Form.Label>
                                <Form.Control defaultValue={state.customerDetails.GSTN} type="text" disabled />
                            </Col>
                            <Col md>
                                <Form.Label>Customer Type</Form.Label>
                                <Form.Control defaultValue={state.customerDetails.customer_type_id} type="text" disabled />
                            </Col>
                        </Row>
                        {state.company_representatives.length > 0 && state.company_representatives.map((obj, ind) => {
                            return (
                                <>
                                    <Row className="g-2" style={row_style}>
                                        <Col md>
                                            <Form.Label>{`Company_name ${ind + 1}`}</Form.Label>
                                            <Form.Control defaultValue={obj.company_name} type="text" disabled />
                                        </Col>
                                        <Col md>
                                            <Form.Label>{`Designation ${ind + 1}`}</Form.Label>
                                            <Form.Control defaultValue={obj.designation} type="text" disabled />
                                        </Col>
                                    </Row>
                                    <Row className="g-2" style={row_style}>
                                        <Col md>
                                            <Form.Label>{`Email ${ind + 1}`}</Form.Label>
                                            <Form.Control defaultValue={obj.email} type="text" disabled />
                                        </Col>
                                        <Col md>
                                            <Form.Label>{`Mobile ${ind + 1}`}</Form.Label>
                                            <Form.Control defaultValue={obj.mobile} type="text" disabled />
                                        </Col>
                                    </Row>
                                </>
                            )
                        })}
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>Material</Form.Label>
                                <Form.Control defaultValue={state.reasons_not_buying.material} type="text" disabled />
                            </Col>
                            <Col md>
                                <Form.Label>Product</Form.Label>
                                <Form.Control defaultValue={state.reasons_not_buying.product} type="text" disabled />
                            </Col>
                        </Row>
                        {
                            state.issue_resolutions.length > 0 ? state.issue_resolutions.map((obj, ind) => {
                                return (
                                    <>
                                        {ind == 0 ? <><Row className="g-2" style={row_style}>
                                            <Col md>
                                                <Form.Label>Reason Details</Form.Label>
                                                <Form.Control defaultValue={state.reasons_not_buying.details} type="text" disabled />
                                            </Col>
                                            <Col md>
                                                <Form.Label>{`Category ${ind + 1}`}</Form.Label>
                                                <Form.Control defaultValue={obj.category} type="text" disabled />
                                            </Col>
                                        </Row>
                                            <Row className="g-2" style={row_style}>
                                                <Col md>
                                                    <Form.Label>{`Content ${ind + 1}`}</Form.Label>
                                                    <Form.Control defaultValue={obj.content} type="text" disabled />
                                                </Col>
                                                <Col md>
                                                    <Form.Label>{`Invoice No. ${ind + 1}`}</Form.Label>
                                                    <Form.Control defaultValue={obj.invoice_number} type="text" disabled />
                                                </Col>
                                            </Row>
                                            <Row className="g-2" style={row_style}>
                                                <Col md>
                                                    <Form.Label>{`Content ${ind + 1}`}</Form.Label>
                                                    <Form.Control defaultValue={obj.content} type="text" disabled />
                                                </Col>
                                                <Col md>
                                                    <Form.Label>{`Invoice No. ${ind + 1}`}</Form.Label>
                                                    <Form.Control defaultValue={obj.invoice_number} type="text" disabled />
                                                </Col>
                                            </Row>
                                            <Row className="g-2" style={row_style}>
                                                <Col md>
                                                    <Form.Label>{`Responsibility ${ind + 1}`}</Form.Label>
                                                    <Form.Control defaultValue={obj.resposibility} type="text" disabled />
                                                </Col>
                                                <Col md>
                                                    <Form.Label>{`Remarks ${ind + 1}`}</Form.Label>
                                                    <Form.Control defaultValue={obj.remarks} type="text" disabled />
                                                </Col>
                                            </Row>
                                            <Row className="g-2" style={row_style}>
                                                <Col md>
                                                    <Form.Label>{`Status ${ind + 1}`}</Form.Label>
                                                    <Form.Control defaultValue={obj.status} type="text" disabled />
                                                </Col>
                                                <Col md>
                                                    <Form.Label>{`Target Date ${ind + 1}`}</Form.Label>
                                                    <Form.Control defaultValue={obj.target_date} type="text" disabled />
                                                </Col>
                                            </Row>
                                        </>
                                            :
                                            <><Row className="g-2" style={row_style}>
                                                <Col md>
                                                    <Form.Label>{`Category ${ind + 1}`}</Form.Label>
                                                    <Form.Control defaultValue={obj.category} type="text" disabled />
                                                </Col>
                                                <Col md>
                                                    <Form.Label>{`Content ${ind + 1}`}</Form.Label>
                                                    <Form.Control defaultValue={obj.content} type="text" disabled />
                                                </Col>
                                            </Row>
                                                <Row className="g-2" style={row_style}>

                                                    <Col md>
                                                        <Form.Label>{`Invoice No. ${ind + 1}`}</Form.Label>
                                                        <Form.Control defaultValue={obj.invoice_number} type="text" disabled />
                                                    </Col>
                                                    <Col md>
                                                        <Form.Label>{`Content ${ind + 1}`}</Form.Label>
                                                        <Form.Control defaultValue={obj.content} type="text" disabled />
                                                    </Col>
                                                </Row>
                                                <Row className="g-2" style={row_style}>

                                                    <Col md>
                                                        <Form.Label>{`Invoice No. ${ind + 1}`}</Form.Label>
                                                        <Form.Control defaultValue={obj.invoice_number} type="text" disabled />
                                                    </Col>
                                                    <Col md>
                                                        <Form.Label>{`Responsibility ${ind + 1}`}</Form.Label>
                                                        <Form.Control defaultValue={obj.resposibility} type="text" disabled />
                                                    </Col>
                                                </Row>
                                                <Row className="g-2" style={row_style}>

                                                    <Col md>
                                                        <Form.Label>{`Remarks ${ind + 1}`}</Form.Label>
                                                        <Form.Control defaultValue={obj.remarks} type="text" disabled />
                                                    </Col>
                                                    <Col md>
                                                        <Form.Label>{`Status ${ind + 1}`}</Form.Label>
                                                        <Form.Control defaultValue={obj.status} type="text" disabled />
                                                    </Col>
                                                </Row>
                                                <Row className="g-2" style={row_style}>

                                                    <Col md>
                                                        <Form.Label>{`Target Date ${ind + 1}`}</Form.Label>
                                                        <Form.Control defaultValue={obj.target_date} type="text" disabled />
                                                    </Col>
                                                    <Col md></Col>
                                                </Row></>
                                        }
                                    </>
                                )
                            }) : <Row className="g-2" style={row_style}>
                                <Col md>
                                    <Form.Label>Reason Details</Form.Label>
                                    <Form.Control defaultValue={state.reasons_not_buying.details} type="text" disabled />
                                </Col>
                                <Col md>
                                </Col>
                            </Row>
                        }
                    </Form>
                </Row>
            </Container>
        </AdminLayout>
    )
}

const row_style = {
    marginTop: "20px"
}