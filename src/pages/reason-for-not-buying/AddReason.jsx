import AdminLayout from '../../layout/AdminLayout';
import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button,InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";

export const AddReason = ()=>{

    const [error, setError] = useState(false);
    const [state, setState] = useState(
        {
            delevery: "",
            packaging: "",
            invoice: "",
            po: "",
            price: "",
            others: "",
            status: "",
        }
    );
    const addReason = async () => {
        if (!state.delevery  || !state.packaging  || !state.invoice  || !state.po  || !state.price  || !state.others  || !state.status ) {
            setError(true)
            return false;
        }
        
        const formData = new FormData();
        formData.append('status', state.status);
        formData.append('delevery', state.delevery);
        formData.append('packaging', state.packaging);
        formData.append('invoice', state.invoice);
        formData.append('po', state.po);
        formData.append('price', state.price);
        formData.append('others', state.others);

        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
    }
    const formClear = async (e) => {
        e.preventDefault();
        setState({
            delevery: "",
            packaging: "",
            invoice: "",
            po: "",
            price: "",
            others: "",
            status: "",
        })
    }

    return(
        <AdminLayout>
            <Container fluid="true">
                <Row>
                    <Col sm={3}><p style={{ fontSize: "30px", fontWeight: "bold", fontFamily: "auto", marginTop: "20px" }}>Add Reason</p></Col>
                    <Col sm={6}></Col>
                    <Col sm={3}><p style={{ fontSize: "20px", fontFamily: "auto", marginTop: "25px", textAlign:'right' }}><Link to="/dashboard" style={{ textDecoration: 'none' }}>Dashboard</Link> / <Link to="/add-reason" style={{ textDecoration: 'none' }}>Add Reason</Link></p></Col>
                </Row>
                <Row style={{backgroundColor:'white', borderRadius:'1%',margin:'2px 1px'}}>
                <Form style={{padding:'25px 20px 25px 25px'}}>
                <Row className="g-2">
                        <Col md>
                            <Form.Label>Delevery Related</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Control value={state.delevery} onChange={(e) => { setState({ ...state, delevery: e.target.value }) }} type="text" />
                            {error && !state.delevery && <span style={invalidInput}>Enter Delevery</span>}
                        </Col>
                        <Col md>
                            <Form.Label>Packaging Related</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Control value={state.packaging} onChange={(e) => { setState({ ...state, packaging: e.target.value }) }} type="text" />
                            {error && !state.packaging && <span style={invalidInput}>Enter Packaging</span>}
                        </Col>
                    </Row>
                    <Row className="g-2">
                        <Col md>
                            <Form.Label>Invoice Related</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Control value={state.invoice} onChange={(e) => { setState({ ...state, invoice: e.target.value }) }} type="text" />
                            {error && !state.invoice && <span style={invalidInput}>Enter Invoice</span>}
                        </Col>
                        <Col md>
                            <Form.Label>Po Related</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Control value={state.po} onChange={(e) => { setState({ ...state, po: e.target.value }) }} type="text" />
                            {error && !state.po && <span style={invalidInput}>Enter Po</span>}
                        </Col>
                    </Row>
                    <Row className="g-2">
                        <Col md>
                            <Form.Label>Price Related</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Control value={state.price} onChange={(e) => { setState({ ...state, price: e.target.value }) }} type="text" />
                            {error && !state.price && <span style={invalidInput}>Enter Price</span>}
                        </Col>
                        <Col md>
                            <Form.Label>Others</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Control value={state.others} onChange={(e) => { setState({ ...state, others: e.target.value }) }} type="text" />
                            {error && !state.others && <span style={invalidInput}>Enter Others</span>}
                        </Col>
                    </Row>
                    <Row className="g-2">
                        <Col md>
                            <Form.Label>Status</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Select aria-label="Floating label select example" value={state.status} onChange={(e) => { setState({ ...state, status: e.target.value }) }}>
                                <option>Select Type</option>
                                <option value="1">Active</option>
                                <option value="2">Inactive</option>
                            </Form.Select>
                            {error && !state.status && <span style={invalidInput}>Select Status</span>}
                        </Col>
                        <Col></Col>
                    </Row>
                </Form>
                </Row>
                <Row className="g-2" style={{ marginLeft: "629px" }}>
                    <Col md style={{ textAlign: "right" }}>
                        <Button onClick={formClear} style={clearbuttonStyle}>Clear</Button>
                    </Col>
                    <Col md>
                        <Button onClick={addReason} style={submitbuttonStyle}>Submit</Button>
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