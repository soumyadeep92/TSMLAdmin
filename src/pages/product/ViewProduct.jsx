import React, { useState, useEffect } from "react";
import AdminLayout from '../../layout/AdminLayout';
import { Container, Row, Col, Form, Button, InputGroup, Image } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import fetchWithAuth from '../../fetchWithAuth';
import { getProductById } from '../../apis/apis'

export const ViewProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [state, setState] = useState(
        {
            id: "", product_name: "", status: ""
        }
    );

    useEffect(() => {
        getProductById(id).then(result => {
            if (result.response.status === true && result.response.data) {
                setState(
                    {
                        id: result.response.data.id,
                        product_name: result.response.data.product_name,
                        status: result.response.data.status == 1 ? "Active" : "Inactive"
                    }
                );
            }
        }).catch(error => {

        });
    }, [state.id])
    const handleNavigate = () => {
        navigate('/list-product')
    }
    return (
        <AdminLayout>
            <Container fluid="true">
                <Row>
                    <Col sm={3}><p className='page_left_panel'>View Product</p></Col>
                    <Col sm={5}></Col>
                    <Col sm={4}><p className='page_right_panel'><span style={{ cursor: 'pointer' }} onClick={handleNavigate}>Product List</span> / View Product</p></Col>
                </Row>
                <Row style={{ backgroundColor: 'white', borderRadius: '1%', margin: '2px 1px' }}>
                    <Form style={{ padding: '25px 20px 25px 25px' }}>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>Material</Form.Label>
                                <Form.Control defaultValue={state.product_name} type="text" disabled />
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