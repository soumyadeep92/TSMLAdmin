import React, { useState, useEffect } from "react";
import { Menu, Search, Mail, Bell } from 'react-feather';
import { useDispatch } from 'react-redux';
import { toggleState } from '../redux/slices/toggleSlice';
import { Card, InputGroup, Form, Row, Col, Image } from 'react-bootstrap';
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_API_URL, ADMIN_BACKEND_IMAGE_URL } from '../constant';
import fetchWithAuth from '../fetchWithAuth';

const Header = () => {
    const dispatch = useDispatch();
    const handleToggle = () => {
        dispatch(toggleState()); // Dispatch the toggle action
    };
    const [user, setUser] = useState({});
    const [notifications, setNotifications] = useState({});
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const getUser = async () => {
        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get-user-by-id/${userId}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        });
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
    const getNotification = async () => {
        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}list/notifications`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (result.success === true && result.response.data) {
            let itemElements = [];
            result.response.data.map((item,index)=>{
                if( item.status === 'unread' ){
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
        }
    }
    useEffect(() => {
        getUser();
        getNotification();
    }, [user.id,notifications.id])

    const handleNotification = async () =>{
        console.log('notifications',notifications);
    }
    return (
        <Card className="header p-3">
            <Row>
                <Col xs={12} sm={6}>
                    <div className='search-block mb-20'>
                        <Menu onClick={handleToggle} className='cursor-style mt-8' />
                        <InputGroup>
                            <Form.Control placeholder="Search Here" />
                            <InputGroup.Text>
                                <Search />
                            </InputGroup.Text>
                        </InputGroup>
                    </div>
                </Col>
                <Col xs={12} sm={6} className='mb-sm-3'>
                    <div className='header-right'>
                        <ul>
                            <li>
                                <Mail />
                                <span className="notification">19</span>
                            </li>
                            <li>
                                <Bell />
                                <span className="notification" style={{cursor:'pointer'}} onClick={handleNotification}>{notifications.length}</span>
                            </li>
                            <li>
                                <div className='pro-img-block'>
                                    <div>
                                        <Image src={ADMIN_BACKEND_IMAGE_URL + user.profile_pic} />
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
    )
}

export default Header