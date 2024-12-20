import AdminLayout from '../../layout/AdminLayout';
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import fetchWithAuth from '../../fetchWithAuth';
import SweetAlert from 'react-bootstrap-sweetalert';
import MultiSelectDropdown from '../../layout/MultiSelectDropdown';
import { getUserByAdmin, listNoticeById, listRoles } from '../../apis/apis'

export const ViewNotice = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [error, setError] = useState(false);
    const [showExistMessage, setShowExistMessage] = useState('');
    const [company, setCompany] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [optionRoles, setOptionRoles] = useState([])
    const [resRoles, setResRoles] = useState({})
    const [state, setState] = useState({
        name: '',
        title: '',
        description: '',
        user_id: [],
        state: '',
        start_date: '',
        end_date: '',
        user_names: []
    });
    const [showAlert, setShowAlert] = useState(false);
    const [show1, setShow1] = useState(false);
    const [res, setRes] = useState([]);
    const handleClose = () => {
        setShowAlert(false);
    };
    const handleClose1 = () => setShow1(false);

    const handleNavigate = () => {
        navigate('/list-notice')
    }

    const handleSelect = (selected) => {
        setSelectedItems(selected);
        console.log('Selected options:', selected);
    };
    const options = res.map(obj => obj['username']);
    function modifyDate(date) {
        if (date) {
            const searchDate = date.split('T')[1].indexOf('.000Z');
            const modifDate = date.split('T')[0] + " " + date.split('T')[1].substring(0, searchDate);
            return modifDate;
        } else {
            return '';
        }
    }
    useEffect(() => {
        listRoles().then(result => {
            if (result.response.status === true) {
                setResRoles(result)
            }
        })
        if (resRoles) {
            const role_names = resRoles.response?.data.map(obj => obj['role_name'])
            setOptionRoles(role_names)
        }
        listNoticeById(id).then(result => {
            if (result.response.status === true) {
                setState(result.response.noticeDetails)
            }
        })
        setUsers(state.user_names)
        getUserByAdmin({ role_id: state.role_ids }).then(result => {
            if (result.response.status) {
                setRes(result.response.data);
            }
        });
        setRoles(state.role_names)
    }, [state.name])
    useEffect(() => {
    }, [users, resRoles])
    return (
        <>
            <AdminLayout>
                <Container fluid="true">
                    <Row>
                        <Col sm={3}><p className='page_left_panel'>View Notice</p></Col>
                        <Col sm={5}></Col>
                        <Col sm={4}><p className='page_right_panel'><span style={{ cursor: 'pointer' }} onClick={handleNavigate}>Notice List</span> / View Notice</p></Col>
                    </Row>
                    <Row style={{ backgroundColor: 'white', borderRadius: '1%', margin: '2px 1px' }}>
                        <Form style={{ padding: '25px 20px 25px 25px' }}>
                            <Row className="g-2">
                                {/* <Col md>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control value={state.name} disabled type="text" />
                                </Col> */}
                                <Col md>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control value={state.title} disabled type="text" />
                                </Col>
                                <Col md>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control value={state.description} disabled type="text" />
                                </Col>
                            </Row>
                            <Row className="g-2">
                                <Col md>
                                    <Form.Label>Select Roles</Form.Label>
                                    <MultiSelectDropdown options={optionRoles} onSelect={handleSelect} fetchedOptions={roles} disabled={true} />
                                </Col>
                                <Col md>
                                    <Form.Label>Select Users</Form.Label>
                                    <MultiSelectDropdown options={options} fetchedOptions={users} disabled={true} />
                                </Col>
                            </Row>
                            <Row className="g-2">
                                <Col md>
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control value={modifyDate(state.start_date)} disabled type="text" />
                                </Col>
                                <Col md>
                                    <Form.Label>End Date</Form.Label>
                                    <Form.Control value={modifyDate(state.end_date)} disabled type="text" />
                                </Col>
                            </Row>
                            <Row className="g-2">
                                <Col md>
                                    <Form.Label>Status</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.status ? "Active" : "Inactive"} disabled />
                                </Col>
                                <Col md></Col>
                            </Row>
                        </Form>
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