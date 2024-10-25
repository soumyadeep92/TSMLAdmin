import AdminLayout from '../../layout/AdminLayout';
import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_CUSTOMER_API_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';

export const AddReason = ()=>{
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [state, setState] = useState(
        {
            reason: "",
            status: "",
        }
    );
    const addreason = async () => {
        if (!state.reason || !state.status ) {
            setError(true)
            return false;
        }
        
        const data = { reason_name: state.reason, status: state.status };
        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}add-reason`,{
            method:'post',
            body:JSON.stringify(data),
            headers:{
                "Content-Type": "application/json"
            }
        });
        if (result.response.status === true) {
            navigate('/list-reason');
        }
    }
    const formClear = async (e) => {
        e.preventDefault();
        setState({
            reason: "",
            status: "",
        })
    }

    return(
        <AdminLayout>
            <Container fluid="true">
                <Row>
                    <Col sm={3}><p className='page_left_panel'>Add Reason</p></Col>
                    <Col sm={5}></Col>
                    <Col sm={4}><p className='page_right_panel'>Dashboard / Add Reason</p></Col>
                </Row>
                <Row style={{backgroundColor:'white', borderRadius:'1%',margin:'2px 1px'}}>
                <Form style={{padding:'25px 20px 25px 25px'}}>
                    <Row className="g-2">
                        <Col md>
                            <Form.Label>reason</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Control value={state.reason} onChange={(e) => { setState({ ...state, reason: e.target.value }) }} type="text" />
                            {error && !state.reason && <span style={invalidInput}>Enter reason</span>}
                        </Col>
                        <Col md>
                            <Form.Label>Status</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Select aria-label="Floating label select example" value={state.status} onChange={(e) => { setState({ ...state, status: e.target.value }) }}>
                                <option value="0">Select Status</option>
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </Form.Select>
                            {error && !state.status && <span style={invalidInput}>Select Status</span>}
                        </Col>
                    </Row>
                </Form>
                </Row>
                <Row className="g-2" style={{ marginLeft: "629px" }}>
                    <Col md style={{ textAlign: "right" }}>
                        <Button onClick={formClear} style={clearbuttonStyle}>Clear</Button>
                    </Col>
                    <Col md>
                        <Button onClick={addreason} style={submitbuttonStyle}>Add</Button>
                    </Col>
                </Row>   
            </Container>    
        </AdminLayout>
    );
}
const clearbuttonStyle = {
    width: "180px",
    height: "39px",
    backgroundColor: "#FFF",
    color: "#3A85E5",
    border: "1px solid #3A85E5",
    marginTop: "15px",
}
const submitbuttonStyle = {
    width: "180px",
    height: "39px",
    radius: "5px",
    backgroundColor: "#3A85E5",
    marginTop: "15px",
}
const asteriskStyle = {
    color: "red"
}
const invalidInput = {
    color: "red"
}