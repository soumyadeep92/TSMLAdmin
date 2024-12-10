import React, { useState, useEffect } from "react";
import { Menu, Search, Mail, Bell } from 'react-feather';
import { useDispatch } from 'react-redux';
import { toggleState } from '../redux/slices/toggleSlice';
import { Card, InputGroup, Form, Row, Col, Image } from 'react-bootstrap';
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_API_URL, ADMIN_BACKEND_IMAGE_URL } from '../constant';
import fetchWithAuth from '../fetchWithAuth';
import { useNavigate } from "react-router-dom";
import Toast from 'react-bootstrap/Toast';
import { getUsersById, listNotifications, updateNotifications } from '../apis/apis';
import ProfileImage from '../assets/profileImage.png';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleToggle = () => {
        dispatch(toggleState()); // Dispatch the toggle action
    };
    const [user, setUser] = useState({});
    const [notifications, setNotifications] = useState([]);
    const [notificationsCount, setNotificationsCount] = useState(0);
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const getUser = async () => {
        let result = await getUsersById(userId)
        if (result.success === true && result.response.data) {
            let itemElements = {};
            itemElements = {
                name: result.response.data.username,
                usertype: result.response.data.role.role_name,
                profile_pic: result.response.data.profile_pic,
            };
            setUser(itemElements);
        }
    }
    useEffect(() => {
        getUser();
        listNotifications().then(result => {
            if (result.success === true && result.response.data) {
                let itemElements = [];
                result.response.data.map((item, index) => {
                    if (item.status === 'unread') {
                        itemElements.push({
                            id: item.id,
                            user_id: item.user_id,
                            topic: item.topic,
                            status: item.status,
                            os_type: item.os_type,
                        });
                        setNotifications(itemElements);
                    }
                })
                setNotificationsCount(result.response.data.length)
            } else {
                setNotifications([]);
                setNotificationsCount(0)
            }
        })
    }, [user.id, notifications.id])

    const handleNotification = async () => {
        setShowA(!showA)
        let result = await updateNotifications()
        setNotificationsCount(0)
    }

    const [showA, setShowA] = useState(false);

    return (
        <>
            <Card className="header p-3">
                <Row className="align-items-center">
                    <Col xs={12} sm={6}>
                        <div className='search-block mb-20 pt-0'>
                            <Menu onClick={handleToggle} className='cursor-style mt-0' />
                            {/* <InputGroup>
                                <Form.Control placeholder="Search Here" />
                                <InputGroup.Text>
                                    <Search />
                                </InputGroup.Text>
                            </InputGroup> */}
                        </div>
                    </Col>
                    <Col xs={12} sm={6} className=''>
                        <div className='header-right'>
                            <ul className="d-flex align-items-center justify-content-end">
                                {/* <li>
                                    <div className='message-header'>
                                        <Mail />
                                        <span className="notification">0</span>
                                    </div>
                                </li> */}
                                <li className="top-0 start-0">
                                    <div className='notification-header mt-0'>
                                        <Bell />
                                        <span className="notification" style={{ cursor: 'pointer' }} onClick={handleNotification}>{notificationsCount}</span>
                                        <div style={toastStyle}>
                                            {
                                                notifications.map((item, index) => (
                                                    <Toast show={showA}>
                                                        <Toast.Header>
                                                            <strong className="me-auto">Notification</strong>
                                                            <small>11 mins ago</small>
                                                        </Toast.Header>
                                                        <Toast.Body>{item.topic}</Toast.Body>
                                                    </Toast>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </li>

                                <li className="top-0 start-0">
                                    <div className='pro-img-block'>
                                        <div className="profile-container">
                                            {JSON.parse(localStorage.getItem('user')).profile_pic && <Image className="profile-image" src={JSON.parse(localStorage.getItem('user')).profile_pic} />}
                                            {!JSON.parse(localStorage.getItem('user')).profile_pic && <Image className="profile-image" src={ProfileImage} />}
                                        </div>
                                        <div className='ml-10'>
                                            <span className='user-name'>{user.name}</span>
                                            <span className='user-role'>{user.usertype}</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default Header

const toastStyle = {
    position: 'absolute',
    right: '0',
    zIndex: '9',
}

