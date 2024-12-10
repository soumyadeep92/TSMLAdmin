import AdminLayout from '../../layout/AdminLayout';
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import fetchWithAuth from '../../fetchWithAuth';
import SweetAlert from 'react-bootstrap-sweetalert';
import MultiSelectDropdown from '../../layout/MultiSelectDropdown';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addNotice, getUserByAdmin, listRoles } from '../../apis/apis'
import { unwrapResult } from '@reduxjs/toolkit';

export const AddNotice = () => {
    const navigate = useNavigate();
    const [selectedStartDateTime, setSelectedStartDateTime] = useState(null);
    const [selectedEndDateTime, setSelectedEndDateTime] = useState(null);

    const handleStartDateTimeChange = (date) => {
        setSelectedStartDateTime(date);
    };
    const handleEndDateTimeChange = (date) => {
        setSelectedEndDateTime(date);
    };
    const [error, setError] = useState(false);
    const [showExistMessage, setShowExistMessage] = useState('');
    const [company, setCompany] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [optionRoles, setOptionRoles] = useState([]);
    const [optionRoleIds, setOptionRoleIds] = useState([]);
    const [selectedItemsRoles, setSelectedItemsRoles] = useState([])
    const [state, setState] = useState({
        name: '',
        title: '',
        description: '',
        user_id: [],
        start_date: '',
        end_date: ''
    });
    const [isAllSelected, setIsAllSelected] = useState(false)
    const [resRoles, setResRoles] = useState([{ id: "", roles: "" }])
    const [showAlert, setShowAlert] = useState(false);
    const [show1, setShow1] = useState(false);
    const [res, setRes] = useState([]);
    const handleClose = () => {
        setShowAlert(false);
    };
    const handleClose1 = () => setShow1(false);
    const addNoticeForm = async () => {
        if (!state.title || !state.description || res.length == 0 || !selectedStartDateTime || !selectedEndDateTime) {
            setError(true)
            return false;
        }
        let user_ids = res.filter(obj => {
            let index_user_id = selectedItems.findIndex(obj1 => obj['id'] == obj1);
            return res[index_user_id]
        })
        user_ids = user_ids.map(obj => obj['id'])
        const data = { title: state.title, description: state.description, user_id: user_ids, role_id: selectedRoles, start_date: selectedStartDateTime, end_date: selectedEndDateTime }
        let result = await addNotice(data)
        if (result.response.status === true) {
            setShowAlert(true);
            setTimeout(() => {
                navigate('/list-notice');
            }, 2000);
        } else {
            setShowAlert(true);
        }
    }
    const formClear = async (e) => {
        e.preventDefault();
        setState({
            name: '',
            title: '',
            description: '',
            user_id: [],
            start_date: '',
            end_date: ''
        })
    }
    const handleNavigate = () => {
        navigate('/list-cvr-mode')
    }
    const add_selected_filter = (selected) => {
        setSelectedItemsRoles(selected)
        const selected_filter = [];
        for (let i = 0; i < selected.length; i++) {
            let filtered_item = resRoles.response?.data.filter(obj => obj['role_name'] == selected[i]).map(obj => obj['id']);
            selected_filter.push(filtered_item[0])
        }
        setSelectedRoles(selected_filter);
        getUserByAdmin({ "role_id": selected_filter }).then(result => {
            if (result.response.status === true) {
                setRes(result.response.data)
            }
        })
    }

    const handleSelectRoles = (selected) => {
        add_selected_filter(selected);
    };

    const handleSelectUsers = (selected) => {
        const filterSelect = res.filter(obj => selected.includes(obj['username'])).map(obj => obj['id']);
        setSelectedItems(filterSelect);
    };

    const options = res.map(obj => obj['username']);
    useEffect(() => {
        listRoles().then(result => {
            if (result.response.status === true) {
                setResRoles(result)
            }
        })
        if (resRoles) {
            const role_names = resRoles.response?.data.map(obj => obj['role_name'])
            setOptionRoles(role_names)
            const role_ids = resRoles.response?.data.map(obj => obj['id'])
            setOptionRoleIds(role_ids)
        }
    }, [resRoles.success])
    useEffect(() => {
    }, [optionRoles, optionRoleIds, selectedItems]);

    const handleSelectAllChangeRole = (isAllSelected) => {
        if (isAllSelected == true) {
            add_selected_filter(optionRoles);
        }
    };

    const handleSelectAllChangeUser = (isAllSelected) => {
        if (isAllSelected == true) {
            const filterSelect = res.map(obj => obj['username']);
            setSelectedItems(filterSelect);
        }
    };

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
                    Notice not created
                </SweetAlert>
            )}
            {showAlert && (
                <SweetAlert
                    success
                    title="Notice Added!"
                    onConfirm={handleClose}
                    confirmBtnBsStyle="success"
                >
                    Notice created successfully
                </SweetAlert>
            )}
            <AdminLayout>
                <Container fluid="true">
                    <Row>
                        <Col sm={3}><p className='page_left_panel'>Add Notice</p></Col>
                        <Col sm={5}></Col>
                        <Col sm={4}><p className='page_right_panel'><span style={{ cursor: 'pointer' }} onClick={handleNavigate}>Notice List</span> / Add Notice</p></Col>
                    </Row>
                    <Row style={{ backgroundColor: 'white', borderRadius: '1%', margin: '2px 1px' }}>
                        <Form style={{ padding: '25px 20px 25px 25px' }}>
                            <Row className="g-2">
                                {/* <Col md>
                                    <Form.Label>Name</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.name} onChange={(e) => { setState({ ...state, name: e.target.value }) }} type="text" />
                                    {error && !state.name && <span style={invalidInput}>Enter Name</span>}
                                </Col> */}
                                <Col md>
                                    <Form.Label>Title</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.title} onChange={(e) => { setState({ ...state, title: e.target.value }) }} type="text" />
                                    {error && !state.title && <span style={invalidInput}>Enter Title</span>}
                                </Col>
                                <Col md>
                                    <Form.Label>Description</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.description} onChange={(e) => { setState({ ...state, description: e.target.value }) }} type="text" />
                                    {error && !state.description && <span style={invalidInput}>Enter Description</span>}
                                </Col>
                            </Row>
                            <Row className="g-2">
                                <Col md>
                                    <Form.Label>Start Date</Form.Label><span style={asteriskStyle}> *</span>
                                    <br />
                                    <DatePicker
                                        selected={selectedStartDateTime}
                                        onChange={handleStartDateTimeChange}
                                        showTimeSelect
                                        dateFormat="yyyy-MM-dd hh:mm:ss"
                                        placeholderText="Select date and time"
                                        className="form-control wide-datepicker"
                                    />
                                </Col>
                                <Col md>
                                    <Form.Label>End Date</Form.Label><span style={asteriskStyle}> *</span>
                                    <br />
                                    <DatePicker
                                        selected={selectedEndDateTime}
                                        onChange={handleEndDateTimeChange}
                                        showTimeSelect
                                        dateFormat="yyyy-MM-dd hh:mm:ss"
                                        placeholderText="Select date and time"
                                        className="form-control wide-datepicker"
                                    />
                                </Col>
                            </Row>
                            <Row className="g-2">
                                <Col md>
                                    <Form.Label>Select Roles</Form.Label><span style={asteriskStyle}> *</span>
                                    <MultiSelectDropdown options={optionRoles} onSelect={handleSelectRoles} fetchedOptions={selectedItemsRoles} onSelectAll={handleSelectAllChangeRole} />
                                    {error && res.length == 0 && <span style={invalidInput}>Please select roles</span>}
                                </Col>
                                <Col md>
                                    <Form.Label>Select Users</Form.Label>
                                    <MultiSelectDropdown options={options} onSelect={handleSelectUsers} fetchedOptions={selectedItems} onSelectAll={handleSelectAllChangeUser} />
                                    {/* {error && selectedItems.length == 0 && <span style={invalidInput}>Please select users</span>} */}
                                </Col>
                            </Row>
                        </Form>
                    </Row>
                    <Row className="g-2" style={{ marginLeft: "629px" }}>
                        <Col md style={{ textAlign: "right" }}>
                            <Button onClick={formClear} style={clearbuttonStyle}>Clear</Button>
                        </Col>
                        <Col md>
                            <Button onClick={addNoticeForm} style={submitbuttonStyle}>Add</Button>
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