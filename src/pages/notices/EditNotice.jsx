import AdminLayout from '../../layout/AdminLayout';
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import fetchWithAuth from '../../fetchWithAuth';
import SweetAlert from 'react-bootstrap-sweetalert';
import MultiSelectDropdown from '../../layout/MultiSelectDropdown';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { listNoticeById, getUserByAdmin, editNotice, listRoles } from '../../apis/apis'

export const EditNotice = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [error, setError] = useState(false);
    const [showExistMessage, setShowExistMessage] = useState('');
    const [company, setCompany] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([]);
    const [resRoles, setResRoles] = useState([{ id: "", roles: "" }])
    const [optionRoles, setOptionRoles] = useState([]);
    const [optionRoleIds, setOptionRoleIds] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedRoleIds, setSelectedRoleIds] = useState([]);
    const [roles, setRoles] = useState([]);
    const [username, setUserNames] = useState([]);
    const [roleIds, setRoleIds] = useState([])
    const [state, setState] = useState({
        name: '',
        title: '',
        description: '',
        user_id: [],
        state: '',
        user_names: []
    });
    const [selectedStartDateTime, setSelectedStartDateTime] = useState(null);
    const [selectedEndDateTime, setSelectedEndDateTime] = useState(null);

    const handleStartDateTimeChange = (date) => {
        setSelectedStartDateTime(date);
    };
    const handleEndDateTimeChange = (date) => {
        setSelectedEndDateTime(date);
    };
    const [showAlert, setShowAlert] = useState(false);
    const [show1, setShow1] = useState(false);
    const [res, setRes] = useState([]);
    const handleClose = () => {
        setShowAlert(false);
    };
    const handleClose1 = () => setShow1(false);
    const editNoticeForm = async () => {
        if (!state.title || !state.description || (selectedRoleIds.length == 0 && roles.length == 0) || state.status == 2 || (!state.start_date && !selectedStartDateTime) || (!state.end_date && !selectedEndDateTime)) {
            setError(true)
            return false;
        }
        let user_ids = res.filter(obj => {
            let index_user_id = selectedItems.length > 0 ? selectedItems.findIndex(obj1 => obj['username'] == obj1) : state.user_names.findIndex(obj1 => obj['username'] == obj1);
            return res[index_user_id]
        })
        user_ids = user_ids.length > 0 && user_ids.map(obj => obj['id'])
        const data = { title: state.title, description: state.description, user_id: user_ids, role_id: selectedRoleIds, start_date: selectedStartDateTime ? selectedStartDateTime : state.start_date, end_date: selectedEndDateTime ? selectedEndDateTime : state.end_date }
        let result = await editNotice(id, data)
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
            status: '',
            user_names: [],
        })
        setRoles([])
        setUserNames([])
    }
    const handleNavigate = () => {
        navigate('/list-notice')
    }

    const add_selected_filter = async (selected) => {
        selected = selected.concat(state.role_names)
        setSelectedRoles(selected)
        const filterSelect = resRoles?.data.filter(obj => selected.includes(obj['role_name'])).map(obj => obj['id']);
        await getUserByAdmin({ "role_id": filterSelect }).then(result => {
            if (result.response.status === true) {
                setRes(result.response.data)
            }
        })
        setSelectedRoleIds(filterSelect)
    }

    const handleSelectRoles = async (selected) => {
        await add_selected_filter(selected);
    };

    const handleSelectUsers = (selected) => {
        const filterSelect = res.filter(obj => selected.includes(obj['username'])).map(obj => obj['username']);
        setSelectedItems(filterSelect);
    };

    const options = res.map(obj => obj['username']);

    useEffect(() => {
        listRoles().then(result => {
            if (result.response.status) {
                setResRoles(result.response);
            }
        });
    }, []);

    useEffect(() => {
        if (id) {
            listNoticeById(id).then(result => {
                if (result.response.status) {
                    setState(result.response.noticeDetails);
                    setUsers(result.response.noticeDetails.user_names || []);
                    setRoles(result.response.noticeDetails.role_names || []);
                    setSelectedRoleIds(result.response.noticeDetails.role_ids || []);
                }
            });
        }
    }, [id]);

    useEffect(() => {
        if (resRoles.data) {
            const roleNames = resRoles.data.map(obj => obj['role_name']);
            setOptionRoles(roleNames);

            const roleIds = resRoles.data.map(obj => obj['id']);
            setOptionRoleIds(roleIds);
        }
    }, [resRoles, selectedRoleIds]);

    useEffect(() => {
        if (selectedRoleIds.length > 0) {
            getUserByAdmin({ role_id: selectedRoleIds }).then(result => {
                if (result.response.status) {
                    setRes(result.response.data);
                    const user_names = res.length > 0 ? res.map(obj => obj['username']) : [];
                    setUserNames(user_names)
                }
            });
        }
    }, [optionRoleIds, selectedRoles]);

    const handleSelectAllChangeRole = async (isAllSelected) => {
        if (isAllSelected == true) {
            await add_selected_filter(optionRoles);
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
                    Notice not updated
                </SweetAlert>
            )}
            {showAlert && (
                <SweetAlert
                    success
                    title="Notice Updated!"
                    onConfirm={handleClose}
                    confirmBtnBsStyle="success"
                >
                    Notice updated successfully
                </SweetAlert>
            )}
            <AdminLayout>
                <Container fluid="true">
                    <Row>
                        <Col sm={3}><p className='page_left_panel'>Update Notice</p></Col>
                        <Col sm={5}></Col>
                        <Col sm={4}><p className='page_right_panel'><span style={{ cursor: 'pointer' }} onClick={handleNavigate}>Notice List</span> / Update Notice</p></Col>
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
                                        selected={
                                            selectedStartDateTime ? selectedStartDateTime : state.start_date
                                        }
                                        onChange={handleStartDateTimeChange}
                                        showTimeSelect
                                        dateFormat="yyyy-MM-dd HH:mm:ss"
                                        placeholderText="Select date and time"
                                        className="form-control wide-datepicker"
                                    />
                                    <Col md>
                                        {error && (!selectedStartDateTime && !state.start_date) && <span style={invalidInput}>Enter Start date</span>}
                                    </Col>
                                </Col>
                                <Col md>
                                    <Form.Label>End Date</Form.Label><span style={asteriskStyle}> *</span>
                                    <br />
                                    <DatePicker
                                        selected={selectedEndDateTime ? selectedEndDateTime : state.end_date}
                                        onChange={handleEndDateTimeChange}
                                        showTimeSelect
                                        dateFormat="yyyy-MM-dd HH:mm:ss"
                                        placeholderText="Select date and time"
                                        className="form-control wide-datepicker"
                                    />
                                    <Col md>
                                        {error && (!selectedEndDateTime && !state.end_date) && <span style={invalidInput}>Enter End date</span>}
                                    </Col>
                                </Col>
                            </Row>
                            <Row className="g-2">
                                <Col md>
                                    <Form.Label>Select Roles</Form.Label><span style={asteriskStyle}> *</span>
                                    <MultiSelectDropdown options={optionRoles} onSelect={handleSelectRoles} fetchedOptions={roles} onSelectAll={handleSelectAllChangeRole} />
                                    {error && selectedRoleIds.length == 0 && <span style={invalidInput}>Please select roles</span>}
                                </Col>
                                <Col md>
                                    <Form.Label>Select Users</Form.Label>
                                    <MultiSelectDropdown options={options} onSelect={handleSelectUsers} fetchedOptions={username} onSelectAll={handleSelectAllChangeUser} />
                                    {/* {error && (selectedItems.length == 0 && users.length == 0) && <span style={invalidInput}>Please select users</span>} */}
                                </Col>
                            </Row>
                            <Row className="g-2">
                                <Col md>
                                    <Form.Label>Status</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Select aria-label="Floating label select example" value={state.status} onChange={(e) => { setState({ ...state, status: e.target.value }) }}>
                                        <option value="2">Select Status</option>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </Form.Select>
                                    {error && state.status == 2 && <span style={invalidInput}>Select Status</span>}
                                </Col>
                                <Col md></Col>
                            </Row>
                        </Form>
                    </Row>
                    <Row className="g-2" style={{ marginLeft: "629px" }}>
                        <Col md style={{ textAlign: "right" }}>
                            <Button onClick={formClear} style={clearbuttonStyle}>Clear</Button>
                        </Col>
                        <Col md>
                            <Button onClick={editNoticeForm} style={submitbuttonStyle}>Update</Button>
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