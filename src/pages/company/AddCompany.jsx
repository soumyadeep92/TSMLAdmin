import AdminLayout from '../../layout/AdminLayout';
import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_CUSTOMER_API_URL, ADMIN_BACKEND_API_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';

export const AddCompany = () => {
    const navigate = useNavigate();
    const inputFile = useRef(null);
    const [error, setError] = useState(false);
    const [state, setState] = useState(
        {
            company_name: "", address: "", company_logo: "", email: "", pan_number: "", GSTN: "", business_nature: "", city: "", state: "", pin_code: "", contact_person_name: "", contact_person_email: "", contact_person_phone: "", contact_person_address: ""
        }
    );
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [errorfile, setErrorfile] = useState(false);
    const [errorfilemsg, setErrorfileMsg] = useState('');
    const addCompany = async () => {
        // if (!state.company_name || !state.address || !state.email || !state.contact_person_name || !state.contact_person_email) {
        //     setError(true)
        //     return false;
        // }
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            const maxSize = 5 * 1024;
            if (!allowedTypes.includes(file.type)) {
                setErrorfile(true);
                setErrorfileMsg('Only JPEG, JPG, and PNG files are allowed!');
                return false;
            }
            if (file.size > maxSize) {
                setErrorfile(true);
                setErrorfileMsg('File size must be less than 5KB!');
                return false;
            }
        } else {
            setError(true)
            return false;
        }

        const formData = new FormData();
        formData.append('company_name', state.company_name);
        formData.append('address', state.address);
        formData.append('company_logo', file);
        formData.append('email', state.email);
        formData.append('pan_number', state.pan_number);
        formData.append('GSTN', state.GSTN);
        formData.append('business_nature', state.business_nature);
        formData.append('city', state.city);
        formData.append('state', state.state);
        formData.append('contact_person_name', state.contact_person_name);
        formData.append('contact_person_email', state.contact_person_email);
        formData.append('contact_person_phone', state.contact_person_phone);
        formData.append('contact_person_address', state.contact_person_address);
        console.log(1111, state)
        console.log(2222, formData)
        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}add/company`, {
            method: 'post',
            body: formData,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            console.log("er", res)
        }).catch(err => {
            console.log("ww", err)
        });
        // if (result.response.status === true) {
        //     // navigate('/list-category');
        // }
    }
    useEffect(() => {
        setFileName(file?.name);
    }, [file])

    const formClear = async (e) => {
        e.preventDefault();
        setState({
            company_name: "", address: "", company_logo: "", email: "", pan_number: "", GSTN: "", business_nature: "", city: "", state: "", contact_person_name: "", pin_code: "", contact_person_email: "", contact_person_phone: "", contact_person_address: ""
        })
        setFileName('')
    }

    const browserBtn = () => {
        inputFile.current.click();
    }

    return (
        <AdminLayout>
            <Container fluid="true">
                <Row>
                    <Col sm={3}><p className='page_left_panel'>Add Company</p></Col>
                    <Col sm={5}></Col>
                    <Col sm={4}><p className='page_right_panel'>Dashboard / Add Company</p></Col>
                </Row>
                <Row style={{ backgroundColor: 'white', borderRadius: '1%', margin: '2px 1px' }}>
                    <Form style={{ padding: '25px 20px 25px 25px' }}>
                        <Row className="g-2">
                            <Col md>
                                <Form.Label>Name</Form.Label><span style={asteriskStyle}> *</span>
                                <Form.Control value={state.company_name} onChange={(e) => { setState({ ...state, company_name: e.target.value }) }} type="text" />
                                {error && !state.company_name && <span style={invalidInput}>Enter Company Name</span>}
                            </Col>
                            <Col md>
                                <Form.Label>Address</Form.Label><span style={asteriskStyle}> *</span>
                                <Form.Control value={state.address} onChange={(e) => { setState({ ...state, address: e.target.value }) }} type="text" />
                                {error && !state.address && <span style={invalidInput}>Enter Company Address</span>}
                            </Col>
                        </Row>
                        <Row className="g-2">
                            <Col md>
                                <Form.Label>Email</Form.Label><span style={asteriskStyle}> *</span>
                                <Form.Control value={state.email} onChange={(e) => { setState({ ...state, email: e.target.value }) }} type="text" />
                                {error && !state.email && <span style={invalidInput}>Enter Company Email</span>}
                            </Col>
                            <Col md>
                                <Form.Label>PAN Number</Form.Label><span style={asteriskStyle}> *</span>
                                <Form.Control value={state.pan_number} onChange={(e) => { setState({ ...state, pan_number: e.target.value }) }} type="text" />
                                {error && !state.pan_number && <span style={invalidInput}>Enter company PAN Number</span>}
                            </Col>
                        </Row>
                        <Row className="g-2">
                            <Col md>
                                <Form.Label>GSTN</Form.Label><span style={asteriskStyle}> *</span>
                                <Form.Control value={state.GSTN} onChange={(e) => { setState({ ...state, GSTN: e.target.value }) }} type="text" />
                                {error && !state.GSTN && <span style={invalidInput}>Enter Company GSTN</span>}
                            </Col>
                            <Col md>
                                <Form.Label>Business Nature</Form.Label><span style={asteriskStyle}> *</span>
                                <Form.Control value={state.business_nature} onChange={(e) => { setState({ ...state, business_nature: e.target.value }) }} type="text" />
                                {error && !state.business_nature && <span style={invalidInput}>Enter Company Business Nature</span>}
                            </Col>
                        </Row>
                        <Row className="g-2">
                            <Col md>
                                <Form.Label>City</Form.Label><span style={asteriskStyle}> *</span>
                                <Form.Control value={state.city} onChange={(e) => { setState({ ...state, city: e.target.value }) }} type="text" />
                                {error && !state.city && <span style={invalidInput}>Enter company city</span>}
                            </Col>
                            <Col md>
                                <Form.Label>State</Form.Label><span style={asteriskStyle}> *</span>
                                <Form.Control value={state.state} onChange={(e) => { setState({ ...state, state: e.target.value }) }} type="text" />
                                {error && !state.state && <span style={invalidInput}>Enter Company State</span>}
                            </Col>
                        </Row>
                        <Row className="g-2">
                            <Col md>
                                <Form.Label>Pin Code</Form.Label><span style={asteriskStyle}> *</span>
                                <Form.Control value={state.pin_code} onChange={(e) => { setState({ ...state, pin_code: e.target.value }) }} type="text" />
                                {error && !state.pin_code && <span style={invalidInput}>Enter Company Pin Code</span>}
                            </Col>
                            <Col md>
                                <Form.Label>Contact Person Name</Form.Label><span style={asteriskStyle}> *</span>
                                <Form.Control value={state.contact_person_name} onChange={(e) => { setState({ ...state, contact_person_name: e.target.value }) }} type="text" />
                                {error && !state.contact_person_name && <span style={invalidInput}>Enter company contact person name</span>}
                            </Col>
                        </Row>
                        <Row className="g-2">
                            <Col md>
                                <Form.Label>Contact Person Address</Form.Label><span style={asteriskStyle}> *</span>
                                <Form.Control value={state.contact_person_address} onChange={(e) => { setState({ ...state, contact_person_address: e.target.value }) }} type="text" />
                                {error && !state.contact_person_address && <span style={invalidInput}>Enter Company Contact Person Address</span>}
                            </Col>
                            <Col md>
                                <Form.Label>Contact Person Email</Form.Label><span style={asteriskStyle}> *</span>
                                <Form.Control value={state.contact_person_email} onChange={(e) => { setState({ ...state, contact_person_email: e.target.value }) }} type="text" />
                                {error && !state.contact_person_email && <span style={invalidInput}>Enter Company Contact Person Email</span>}
                            </Col>
                        </Row>
                        <Row className="g-2">
                            <Col md>
                                <Form.Label>Contact Person Phone</Form.Label><span style={asteriskStyle}> *</span>
                                <Form.Control value={state.contact_person_phone} onChange={(e) => { setState({ ...state, contact_person_phone: e.target.value }) }} type="text" />
                                {error && !state.contact_person_phone && <span style={invalidInput}>Enter company contact person phome</span>}
                            </Col>
                            <Col md>
                                <Form.Label>Upload Logo</Form.Label><span style={asteriskStyle}> *</span>
                                <InputGroup>
                                    <Form.Control style={{ display: "none" }} type="file" ref={inputFile} onChange={(e) => { setFile(e.target.files[0]) }} />
                                    <Form.Control value={fileName ? fileName : ''} disabled />
                                    <InputGroup.Text onClick={browserBtn} style={{ cursor: "pointer" }}>Browse</InputGroup.Text>
                                </InputGroup>
                                {error && !file && <span style={invalidInput}>Choose File</span>}
                                {errorfile && <span style={invalidInput}>{errorfilemsg}</span>}
                            </Col>
                        </Row>
                    </Form>
                </Row>
                <Row className="g-2" style={{ marginLeft: "629px" }}>
                    <Col md style={{ textAlign: "right" }}>
                        <Button onClick={formClear} style={clearbuttonStyle}>Clear</Button>
                    </Col>
                    <Col md>
                        <Button onClick={addCompany} style={submitbuttonStyle}>Add</Button>
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