import AdminLayout from '../../layout/AdminLayout';
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import fetchWithAuth from '../../fetchWithAuth';
import SweetAlert from 'react-bootstrap-sweetalert';
import { CVRData } from '../../apis/apis'

export const CVR = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [users, setUsers] = useState([]);
    const [roleId, setRoleId] = useState(0);
    const [showExistMessage, setShowExistMessage] = useState('');
    const handleClose2 = () => setShow2(false);
    const [show2, setShow2] = useState(false);
    const [existCVR, setExistCVR] = useState(null);
    const [checked, setChecked] = useState({ check_in_image_flag: true, check_out_image_flag: true, online_visit_plan_start_date_flag: true, online_visit_plan_end_date_flag: true, offline_check_in_image_flag: true, offline_check_out_image_flag: true });
    const [showAlert, setShowAlert] = useState(false);
    const [show1, setShow1] = useState(false);
    const handleClose = () => {
        setShowAlert(false);
    };
    const handleClose1 = () => setShow1(false);
    const handleChange = async (check, permission) => {
        if (permission == 'check_in_image_flag') {
            setChecked({ 'check_in_image_flag': !check, 'check_out_image_flag': checked.check_out_image_flag, 'online_visit_plan_start_date_flag': checked.online_visit_plan_start_date_flag, 'online_visit_plan_end_date_flag': checked.online_visit_plan_end_date_flag, 'offline_check_in_image_flag': checked.offline_check_in_image_flag, 'offline_check_out_image_flag': checked.offline_check_out_image_flag });
        }
        if (permission == 'check_out_image_flag') {
            setChecked({ 'check_in_image_flag': checked.check_in_image_flag, 'check_out_image_flag': !check, 'online_visit_plan_start_date_flag': checked.online_visit_plan_start_date_flag, 'online_visit_plan_end_date_flag': checked.online_visit_plan_end_date_flag, 'offline_check_in_image_flag': checked.offline_check_in_image_flag, 'offline_check_out_image_flag': checked.offline_check_out_image_flag });
        }
        if (permission == 'online_visit_plan_start_date_flag') {
            setChecked({ 'check_in_image_flag': checked.check_in_image_flag, 'check_out_image_flag': checked.check_out_image_flag, 'online_visit_plan_start_date_flag': !check, 'online_visit_plan_end_date_flag': checked.online_visit_plan_end_date_flag, offline_check_in_image_flag: checked.offline_check_in_image_flag, 'offline_check_out_image_flag': checked.offline_check_out_image_flag });
        }
        if (permission == 'online_visit_plan_end_date_flag') {
            setChecked({ 'check_in_image_flag': checked.check_in_image_flag, 'check_out_image_flag': checked.check_out_image_flag, 'online_visit_plan_start_date_flag': checked.online_visit_plan_start_date_flag, 'online_visit_plan_end_date_flag': !check, offline_check_in_image_flag: checked.offline_check_in_image_flag, 'offline_check_out_image_flag': checked.offline_check_out_image_flag });
        }
        if (permission == 'offline_check_in_image_flag') {
            setChecked({ 'check_in_image_flag': checked.check_in_image_flag, 'check_out_image_flag': checked.check_out_image_flag, 'online_visit_plan_start_date_flag': checked.online_visit_plan_start_date_flag, 'online_visit_plan_end_date_flag': checked.online_visit_plan_end_date_flag, offline_check_in_image_flag: !check, 'offline_check_out_image_flag': checked.offline_check_out_image_flag });
        }
        if (permission == 'offline_check_out_image_flag') {
            setChecked({ 'check_in_image_flag': checked.check_in_image_flag, 'check_out_image_flag': checked.check_out_image_flag, 'online_visit_plan_start_date_flag': checked.online_visit_plan_start_date_flag, 'online_visit_plan_end_date_flag': checked.online_visit_plan_end_date_flag, offline_check_in_image_flag: checked.offline_check_in_image_flag, 'offline_check_out_image_flag': !check });
        }
    };
    // const addUserType = async () => {
    //     if (!state.type || !state.status) {
    //         setError(true)
    //         return false;
    //     }
    //     let user_type = { role_name: state.type };
    //     let user_types = await getRoleByName(user_type);
    //     if (user_types.response.status == false) {
    //         const companies_id = JSON.parse(localStorage.getItem('user')).user_companies_id;
    //         const data = { role_name: state.type, company_id: companies_id, status: state.status };
    //         let result = await createRole(data)
    //         if (result.response.status === true) {
    //             const data = {
    //                 role_id: result.response.data.id,
    //                 can_read: (checked.can_add === true) ? 1 : 0,
    //                 can_edit: (checked.can_edit === true) ? 1 : 0,
    //                 can_delete: (checked.can_delete === true) ? 1 : 0,
    //                 can_view: (checked.can_view === true) ? 1 : 0,
    //             };
    //             await permissions(data)
    //             setShowAlert(true);
    //             setTimeout(() => {
    //                 navigate('/list-user-type');
    //             }, 2000);
    //         } else {
    //             setShowAlert(true);
    //         }
    //     } else {
    //         setShow2(true)
    //         setShowExistMessage(user_types.response.message)
    //     }
    // }

    const formClear = async (e) => {
        e.preventDefault();
        setChecked({ check_in_image_flag: false, check_out_image_flag: false, online_visit_plan_start_date_flag: false, online_visit_plan_end_date_flag: false, offline_check_in_image_flag: false, offline_check_out_image_flag: false });
    }
    const handleNavigate = () => {
        navigate('/dashboard')
    }

    const CVRHandle = async () => {
        const cvrDetails = await CVRData(checked);
        setShowAlert(true)
        setTimeout(() => {
            navigate('/dashboard');
        }, 2000);
    }

    useEffect(() => {
        const cvrDetails = CVRData({}).then(res => {
            setExistCVR(res.response)
        }).catch(err => {

        })
    }, [])

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
                    CVR flags not updated
                </SweetAlert>
            )}
            {showAlert && (
                <SweetAlert
                    success
                    title="CVR flags Updated!"
                    onConfirm={handleClose}
                    confirmBtnBsStyle="success"
                >
                    CVR flags updated successfully
                </SweetAlert>
            )}
            <AdminLayout>
                <Container fluid="true">
                    <Row>
                        <Col sm={3}><p className='page_left_panel'>CVR</p></Col>
                        <Col sm={5}></Col>
                        <Col sm={4}><p className='page_right_panel'><span style={{ cursor: 'pointer' }} onClick={handleNavigate}>Dashboard</span> / CVR</p></Col>
                    </Row>
                    <Row style={{ backgroundColor: 'white', borderRadius: '1%', margin: '2px 1px' }}>
                        <Form style={{ padding: '25px 20px 25px 25px' }}>
                            {/* <Row className="g-2">
                                <Col md>
                                    <Form.Label>User Type</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.type} onChange={(e) => { setState({ ...state, type: e.target.value }) }} type="text" />
                                    {error && !state.type && <span style={invalidInput}>Enter Type</span>}
                                </Col>
                                <Col md>
                                    <Form.Label>Status</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Select aria-label="Floating label select example" value={state.status} onChange={(e) => { setState({ ...state, status: e.target.value }) }}>
                                        <option value="2">Select Status</option>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </Form.Select>
                                </Col>
                            </Row> */}
                            <Row className="g-2">
                                <Col md>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Visit Plan Start Date</th>
                                                <th>Visit Plan End Date</th>
                                                <th>Online Check In Image</th>
                                                <th>Online Check Out Image</th>
                                                <th>Offline Check In Image</th>
                                                <th>Offline Check Out Image</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <input name="check_in_image_flag" type="checkbox"
                                                        checked={checked?.check_in_image_flag}
                                                        onChange={() => handleChange(checked?.check_in_image_flag, 'check_in_image_flag')}
                                                    />
                                                </td>
                                                <td>
                                                    <input name="check_out_image_flag" type="checkbox"
                                                        checked={checked?.check_out_image_flag}
                                                        onChange={() => handleChange(checked?.check_out_image_flag, 'check_out_image_flag')}
                                                    />
                                                </td>
                                                <td>
                                                    <input name="online_visit_plan_start_date_flag" type="checkbox"
                                                        checked={checked?.online_visit_plan_start_date_flag}
                                                        onChange={() => handleChange(checked?.online_visit_plan_start_date_flag, 'online_visit_plan_start_date_flag')}
                                                    />
                                                </td>
                                                <td>
                                                    <input name="online_visit_plan_end_date_flag" type="checkbox"
                                                        checked={checked?.online_visit_plan_end_date_flag}
                                                        onChange={() => handleChange(checked?.online_visit_plan_end_date_flag, 'online_visit_plan_end_date_flag')}
                                                    />
                                                </td>
                                                <td>
                                                    <input name="offline_check_in_image_flag" type="checkbox"
                                                        checked={checked?.offline_check_in_image_flag}
                                                        onChange={() => handleChange(checked?.offline_check_in_image_flag, 'offline_check_in_image_flag')}
                                                    />
                                                </td>
                                                <td>
                                                    <input name="offline_check_out_image_flag" type="checkbox"
                                                        checked={checked?.offline_check_out_image_flag}
                                                        onChange={() => handleChange(checked?.offline_check_out_image_flag, 'offline_check_out_image_flag')}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>

                                </Col>
                            </Row>
                        </Form>
                    </Row>
                    <Row className="g-2" style={{ marginLeft: "629px" }}>
                        <Col md style={{ textAlign: "right" }}>
                            <Button onClick={formClear} style={clearbuttonStyle}>Clear</Button>
                        </Col>
                        <Col md>
                            {!existCVR ? <Button onClick={CVRHandle} style={submitbuttonStyle}>Add</Button> : <Button onClick={CVRHandle} style={submitbuttonStyle}>Update</Button>}
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