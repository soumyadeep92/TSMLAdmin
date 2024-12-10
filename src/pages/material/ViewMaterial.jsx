import React, { useState, useEffect } from "react";
import AdminLayout from '../../layout/AdminLayout';
import { Container, Row, Col, Form, Button, InputGroup, Image } from "react-bootstrap";
import { Link, useParams,useNavigate } from "react-router-dom";
import fetchWithAuth from '../../fetchWithAuth';
import {getMaterialById} from '../../apis/apis'

export const ViewMaterial = () => {
    const navigate=useNavigate();
    const { id } = useParams();
    const [state, setState] = useState(
        {
            id: "", material_name: "", status: ""
        }
    );

    useEffect(() => {
        getMaterialById(id).then(result => {
            if (result.response.status === true && result.response.data) {
                let itemElements = {};
                itemElements = {
                    dataid: result.response.data.id,
                    material_name: result.response.data.material_name,
                    status: result.response.data.status
                }
                setState(
                    {
                        ...state,
                        id: itemElements.dataid,
                        material_name: itemElements.material_name,
                        status: itemElements.status == 1 ? "Active" : "Inactive"
                    }
                );
            }
        }).catch(error => {

        });
    }, [])
    const handleNavigate = () => {
        navigate('/list-material')
    }
    return (
        <AdminLayout>
            <Container fluid="true">
                <Row>
                    <Col sm={3}><p className='page_left_panel'>View Material</p></Col>
                    <Col sm={5}></Col>
                    <Col sm={4}><p className='page_right_panel'><span style={{ cursor: 'pointer' }} onClick={handleNavigate}>Material List</span> / View Material</p></Col>
                </Row>
                <Row style={{ backgroundColor: 'white', borderRadius: '1%', margin: '2px 1px' }}>
                    <Form style={{ padding: '25px 20px 25px 25px' }}>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>Material</Form.Label>
                                <Form.Control defaultValue={state.material_name} type="text" disabled />
                            </Col>
                            <Col md>
                                <Form.Label>Status</Form.Label>
                                <Form.Control defaultValue={state.status} type="text" disabled />
                            </Col>
                        </Row>
                    </Form>
                </Row>
            </Container>
        </AdminLayout>
    )
}

const row_style = {
    marginTop: "20px"
}