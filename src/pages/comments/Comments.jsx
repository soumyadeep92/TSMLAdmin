import AdminLayout from '../../layout/AdminLayout'
import React, { useState, useEffect } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import { Container, Col, Row, Table, Form, InputGroup, Button, Modal } from 'react-bootstrap';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fetchWithAuth from '../../fetchWithAuth';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Link, useNavigate, useParams } from "react-router-dom";
import './comments.css';
import { CvrTimeSchedule } from '../settings/CvrTimeSchedule';
import { addComments, listCommentsById, createNotifications } from '../../apis/apis'

export const Comments = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const handleNavigate = () => {
        navigate('/dashboard')
    }
    const handleNavigateCVR = () => {
        navigate('/cvr-time-schedule')
    }
    const [messages, setMessages] = useState([
    ]);
    const [input, setInput] = useState("");
    const [user, setUser] = useState({});

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    async function getApiData() {
        await listCommentsById(id).then(res => {
            setMessages(res.response.commentDetails);
            setUser(res.response.userDetails)
            setInput("");
        }).catch(err => {

        })
    }
    useEffect(() => {
        getApiData()
    }, [messages.id])
    const postComment = async () => {
        const adminId = JSON.parse(localStorage.getItem('user')).id;
        const data = {
            user_id: adminId,
            cvr_id: id,
            comment: input,
        }
        let result = await addComments(data)
        if (result.response.status === true) {
            getApiData()
            let body = {
                "topic": `Admin has commented on cvr id ${id}`,
                "os_type": "android",
                user_ids: []
            }
            await createNotifications(body)
        } else {

        }
    }
    function modifyDate(date) {
        if (date) {
            const searchDate = date.split('T')[1].indexOf('.000Z');
            const modifDate = date.split('T')[1].substring(0, searchDate);
            let onlyDate = modifDate.split(':')[0] + ":" + modifDate.split(':')[1];
            return onlyDate;
        } else {
            return '';
        }
    }
    return (
        <>
            <AdminLayout>
                <Container fluid="true">
                    <Row>
                        <Col sm={3}><p className='page_left_panel'>CVR Schedule Chat</p></Col>
                        <Col sm={5}></Col>
                        <Col sm={4}><p className='page_right_panel'><span style={{ cursor: 'pointer' }} onClick={handleNavigate}>Dashboard</span> / <span style={{ cursor: 'pointer' }} onClick={handleNavigateCVR}>CVR Schedule</span></p></Col>
                    </Row>
                    <div style={{ backgroundColor: 'white', borderRadius: '1%', margin: '2px 1px', padding: '25px 20px 25px 25px' }}>
                        <Row style={tableHeaderStyle}>
                            <Col style={{ textAlign: 'right' }} sm={3}>
                                <div style={fontFamilyStyle}>
                                </div>
                            </Col>
                            {/* <Col sm={6}></Col>
                            <Col sm={3}> */}
                            <div style={fontFamilyStyle}>
                                <p style={cvrStyle}>CVR ID - {id}</p>
                            </div>
                            {/* </Col> */}
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                {messages.map((msg, index) => (
                                    <div key={index} className={`message ${msg.user_id === JSON.parse(localStorage.getItem('user')).id ? "text-end" : "text-start"}`}>
                                        <p>
                                            <span className={`p-2 rounded d-block w-50 ${msg.user_id === JSON.parse(localStorage.getItem('user')).id ? "bg-primary text-white" : "bg-light text-dark"}`}>
                                                {msg.comment}
                                            </span>
                                            <div className='clear'></div>
                                            <div className='d-flex w-50 justify-content-between'>
                                                <span className='usertext'>{msg.user_id === JSON.parse(localStorage.getItem('user')).id ? msg.userDetailsSend : msg.userDetailsReceive}</span>
                                                <span className='timetext'>{modifyDate(msg.created_at)}</span>
                                            </div>
                                            <div className='clear'></div>
                                        </p>
                                    </div>
                                ))}
                            </Col>
                        </Row>
                        <Row className="p-3">
                            <Col xs={10}>
                                <Form.Control
                                    type="text"
                                    placeholder="Type a message"
                                    value={input}
                                    onChange={handleInputChange}
                                // onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                />
                            </Col>
                            <Col xs={2}>
                                <Button variant="primary" onClick={postComment} className="w-100">Send</Button>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </AdminLayout>
        </>
    )
}

const tableHeaderStyle = {
    height: '70px',
    boxShadow: '0px 7px 10px -12px'
}
const fontFamilyStyle = {
    fontFamily: 'math'
}
const cvrStyle = {
    fontSize: '1.5rem',
}