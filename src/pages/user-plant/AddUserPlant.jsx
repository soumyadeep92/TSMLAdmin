import AdminLayout from '../../layout/AdminLayout';
import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button,InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";

export const AddUserPlant = ()=>{

    const [error, setError] = useState(false);
    const [state, setState] = useState(
        {
            plant: "",
            status: "",
        }
    );
    const addUserPlant = async () => {
        if (!state.plant || !state.status ) {
            setError(true)
            return false;
        }
        
        const formData = new FormData();
        formData.append('status', state.status);
        formData.append('plant', state.plant);

        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
    }
    const formClear = async (e) => {
        e.preventDefault();
        setState({
            plant: "",
            status: "",
        })
    }

    return(
        <AdminLayout>
            <Container fluid="true">
                <Row>
                    <Col sm={3}><p style={{ fontSize: "30px", fontWeight: "bold", fontFamily: "auto", marginTop: "20px" }}>Add User Plant</p></Col>
                    <Col sm={6}></Col>
                    <Col sm={3}><p style={{ fontSize: "20px", fontFamily: "auto", marginTop: "25px", textAlign:'right' }}><Link to="/dashboard" style={{ textDecoration: 'none' }}>Dashboard</Link> / <Link to="/add-user-plant" style={{ textDecoration: 'none' }}>Add User Plant</Link></p></Col>
                </Row>
                <Row style={{backgroundColor:'white', borderRadius:'1%',margin:'2px 1px'}}>
                <Form style={{padding:'25px 20px 25px 25px'}}>
                    <Row className="g-2">
                        <Col md>
                            <Form.Label>User Plant</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Control value={state.plant} onChange={(e) => { setState({ ...state, plant: e.target.value }) }} type="text" />
                            {error && !state.plant && <span style={invalidInput}>Enter Plant</span>}
                        </Col>
                        <Col md>
                            <Form.Label>Status</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Select aria-label="Floating label select example" value={state.status} onChange={(e) => { setState({ ...state, status: e.target.value }) }}>
                                <option>Select Type</option>
                                <option value="1">Active</option>
                                <option value="2">Inactive</option>
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
                        <Button onClick={addUserPlant} style={submitbuttonStyle}>Submit</Button>
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