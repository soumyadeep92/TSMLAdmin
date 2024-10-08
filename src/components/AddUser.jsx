import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button,InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export const AddUser = () => {
    const inputFile = useRef(null);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [error, setError] = useState(false);
    const [state, setState] = useState(
        {
            name: "",
            userId: "",
            userType: "",
            phone: "",
            email: "",
            location: "",
            status: "",
        }
    );
    const addUser = async () => {
        if (!state.name || !state.phone || !state.email || !state.location || !state.status || !state.userId || !state.userType) {
            setError(true)
            return false;
        }
        if(!file){
            setError(true)
            return false; 
        }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        formData.append('name', state.name);
        formData.append('phone', state.phone);
        formData.append('email', state.email);
        formData.append('location', state.location);
        formData.append('status', state.status);
        formData.append('userId', state.userId);
        formData.append('userType', state.userType);

        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
    }

    const formClear = async (e) => {
        e.preventDefault();
        setState({
            name: "",
            userId: "",
            userType: "",
            phone: "",
            email: "",
            location: "",
            status: "",
        })
        setFile(null);
        setFileName('')
    }
    const browserBtn = ()=>{
        inputFile.current.click();
    }
    
    useEffect(()=>{
        setFileName(file?.name);
    },[file])
    
    return (
        <>
            <Container fluid="true">
                <p style={textStyle}>Add User</p>
                <Form style={formStyle}>
                    <Row className="g-2">
                        <Col md>
                            <Form.Label>Name</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Control value={state.name} onChange={(e) => { setState({ ...state, name: e.target.value }) }} type="text" />
                            {error && !state.name && <span style={invalidInput}>Enter Name</span>}
                        </Col>
                        <Col md>
                            <Form.Label>User Id</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Control value={state.userId} onChange={(e) => { setState({ ...state, userId: e.target.value }) }} type="text" />
                            {error && !state.userId && <span style={invalidInput}>Enter UserId</span>}
                        </Col>
                    </Row>
                    <Row className="g-2" style={row_style}>
                        <Col md>
                            <Form.Label>User Type</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Select aria-label="Floating label select example" value={state.userType} onChange={(e) => { setState({ ...state, userType: e.target.value }) }}>
                                <option>Select Type</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                            {error && !state.userType && <span style={invalidInput}>Select Type</span>}
                        </Col>
                        <Col md>
                            <Form.Label>Phone No.</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Control value={state.phone} onChange={(e) => { setState({ ...state, phone: e.target.value }) }} type="text" />
                            {error && !state.phone && <span style={invalidInput}>Enter Phne</span>}
                        </Col>
                    </Row>
                    <Row className="g-2" style={row_style}>
                        <Col md>
                            <Form.Label>Email</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Control value={state.email} onChange={(e) => { setState({ ...state, email: e.target.value }) }} type="email" />
                            {error && !state.email && <span style={invalidInput}>Enter Email</span>}
                        </Col>
                        <Col md>
                            <Form.Label>Location</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Control value={state.location} onChange={(e) => { setState({ ...state, location: e.target.value }) }} type="text" />{error && !state.location && <span style={invalidInput}>Enter Location</span>}
                        </Col>
                    </Row>
                    <Row className="g-2" style={row_style}>
                        <Col md>
                            <Form.Label>Status</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Select aria-label="Floating label select example" value={state.status} onChange={(e) => { setState({ ...state, status: e.target.value }) }}>
                                <option>Select Status</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                            {error && !state.status && <span style={invalidInput}>Select Status</span>}
                        </Col>
                        <Col md>
                            {/* <Form.Label>Upload User Image</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Control type="file" ref={inputFile} onChange={(e)=>{setState({...state,file: e.target.files[0]})}} />
                            { error && !state.file && <span style={invalidInput}>Choose File</span>} */}

                            <Form.Label>Upload User Image</Form.Label><span style={asteriskStyle}> *</span>
                            <InputGroup>
                            <Form.Control style={{display:"none"}} type="file" ref={inputFile} onChange={(e)=>{setFile(e.target.files[0])}} />
                            <Form.Control  value={fileName} disabled/>
                            <InputGroup.Text onClick={browserBtn} style={{cursor:"pointer"}}>Browser</InputGroup.Text>
                            </InputGroup>
                            { error && !file && <span style={invalidInput}>Choose File</span>}
                        

                        </Col>
                    </Row>
                </Form>
                <Row className="g-2" style={{ marginLeft: "505px" }}>
                    <Col md style={{ textAlign: "right" }}>
                        <Button onClick={formClear} style={clearbuttonStyle}>Clear</Button>
                    </Col>
                    <Col md>
                        <Button onClick={addUser} style={submitbuttonStyle}>Submit</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
const invalidInput = {
    color: "red"
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

const row_style = {
    marginTop: "20px"
}
const textStyle = {
    marginLeft: "0px",
    fontSize: "30px",
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "Mulish",
    width: "399px",
    height: "18px",
    marginTop: "100px"
}

const formStyle = {
    paddingTop: "20px",
    paddingLeft: "50px",
}

const asteriskStyle = {
    color: "red"
}