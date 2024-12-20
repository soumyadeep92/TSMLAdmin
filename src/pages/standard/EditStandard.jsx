import AdminLayout from '../../layout/AdminLayout';
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import fetchWithAuth from '../../fetchWithAuth';
import SweetAlert from 'react-bootstrap-sweetalert';
import { editStandard, getStandardById } from '../../apis/apis'

export const EditStandard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [apiData, setApiData] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [show1, setShow1] = useState(false);
    const handleClose = () => {
        setShowAlert(false);
    };
    const handleClose1 = () => setShow1(false);
    const [state, setState] = useState(
        {
            standard: "",
            status: "",
        }
    );

    const editstandard = async () => {
        if (!state.standard || state.status == 2) {
            setError(true)
            return false;
        }

        const data = { 'standard_name': state.standard, 'status': state.status };
        let result = await editStandard(id, data)
        if (result.response.status === true) {
            setShowAlert(true);
            setTimeout(() => {
                navigate('/list-standard');
            }, 2000);
        } else {
            setShowAlert(true);
        }
    }

    const formClear = async (e) => {
        e.preventDefault();
        setState({
            standard: "",
            status: "",
        })
    }

    const getApiDatas = async () => {
        let result = await getStandardById(id)
        if (result.success === true && result.response.data) {
            let itemElements = {};
            itemElements = {
                id: result.response.data.id,
                standard: result.response.data.standard_name,
                status: result.response.data.status,
            };

            setApiData(itemElements);
        }
    }

    useEffect(() => {
        getApiDatas();
        setState(
            {
                ...state,
                standard: apiData.standard,
                status: apiData.status,
            }
        );
    }, [apiData.id])
    const handleNavigate = () => {
        navigate('/list-standard')
    }

    return (
        <>
            {show1 && (
                <SweetAlert
                    warning
                    title="Oops!"
                    onConfirm={handleClose1}
                    onCancel={handleClose1}
                    confirmBtnBsStyle="success"
                >
                    Standard not updated
                </SweetAlert>
            )}
            {showAlert && (
                <SweetAlert
                    success
                    title="Standard Updated!"
                    onConfirm={handleClose}
                    confirmBtnBsStyle="success"
                >
                    Standard updated successfully
                </SweetAlert>
            )}
            <AdminLayout>
                <Container fluid="true">
                    <Row>
                        <Col sm={3}><p className='page_left_panel'>Edit Standard</p></Col>
                        <Col sm={5}></Col>
                        <Col sm={4}><p className='page_right_panel'><span style={{ cursor: 'pointer' }} onClick={handleNavigate}>Standard List</span> / Edit Standard</p></Col>
                    </Row>
                    <Row style={{ backgroundColor: 'white', borderRadius: '1%', margin: '2px 1px' }}>
                        <Form style={{ padding: '25px 20px 25px 25px' }}>
                            <Row className="g-2">
                                <Col md>
                                    <Form.Label>Standard</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.standard} onChange={(e) => { setState({ ...state, standard: e.target.value }) }} type="text" />
                                    {error && !state.standard && <span style={invalidInput}>Enter standard</span>}
                                </Col>
                                <Col md>
                                    <Form.Label>Status</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Select aria-label="Floating label select example" value={state.status} onChange={(e) => { setState({ ...state, status: e.target.value }) }}>
                                        <option value="2">Select Status</option>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </Form.Select>
                                    {error && state.status == 2 && <span style={invalidInput}>Select Status</span>}
                                </Col>
                            </Row>
                        </Form>
                    </Row>
                    <Row className="g-2" style={{ marginLeft: "629px" }}>
                        <Col md style={{ textAlign: "right" }}>
                            <Button onClick={formClear} style={clearbuttonStyle}>Clear</Button>
                        </Col>
                        <Col md>
                            <Button onClick={editstandard} style={submitbuttonStyle}>Update</Button>
                        </Col>
                    </Row>
                </Container>
            </AdminLayout>
        </>
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