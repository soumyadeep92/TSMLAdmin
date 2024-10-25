import React, { useState, useEffect } from "react";
import AdminLayout from '../../layout/AdminLayout';
import { Container, Row, Col, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_API_URL, ADMIN_BACKEND_IMAGE_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';

export const ViewUser = ()=>{

    const { id } = useParams();
    const [user, setUsers] = useState({});
    const [file, setFile] = useState('');
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
    const getUser = async () => {
        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get-user-by-id/${id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (result.success === true && result.response.data) {
            let itemElements = {};
            itemElements = {
                name: result.response.data.username,
                usercode: result.response.data.user_code,
                usertype: result.response.data.role.role_name,
                email: result.response.data.email,
                phone: result.response.data.phone,
                location: result.response.data.location,
                profile_pic: result.response.data.profile_pic,
                status: result.response.data.user_status.status,
            };
            
            setUsers(itemElements);
        }
    }
    useEffect(()=>{
        getUser();
        setState(
            {
                name: user.name,
                userId: user.usercode,
                userType: user.usertype,
                phone: user.phone,
                email: user.email,
                location: user.location,
                status: user.status,
            }
        );
        setFile(user.profile_pic);
    },[user.name])

    return (
        <AdminLayout>
            <Container fluid="true" style={{padding:'25px 20px 25px 25px'}}>
                <Row>
                    <Col sm={3}><p className='page_left_panel'>View User</p></Col>
                    <Col sm={5}></Col>
                    <Col sm={4}><p className='page_right_panel'>Dashboard / View User</p></Col>
                </Row>
                <div style={{backgroundColor:'white'}}>
                <Row className="g-2" style={rowStyle}>
                    <Col md style={colStyle}>
                        <div style={divLevel}><label htmlFor="">User Name</label></div>
                        <div style={divText}>{state.name}</div>
                        
                    </Col>
                    <Col md style={colStyle}>
                    
                        <div style={divLevel}><label htmlFor="">User Code</label></div>
                        <div style={divText}>{state.userId}</div>
                    </Col>
                </Row>
                <Row className="g-2" style={rowStyle}>
                    <Col md style={colStyle}>
                        <div style={divLevel}><label htmlFor="">User Type</label></div>
                        <div style={divText}>{state.userType}</div>
                        
                    </Col>
                    <Col md style={colStyle}>
                        <div style={divLevel}><label htmlFor="">Phone Number</label></div>
                        <div style={divText}>{state.phone}</div>
                        
                    </Col>
                </Row>
                <Row className="g-2" style={rowStyle}>
                    <Col md style={colStyle}>
                        <div style={divLevel}><label htmlFor="">Email</label></div>
                        <div style={divText}>{state.email}</div>
                        
                    </Col>
                    <Col md style={colStyle}>
                        <div style={divLevel}><label htmlFor="">Location</label></div>
                        <div style={divText}>{state.location}</div>
                        
                    </Col>
                </Row>
                <Row className="g-2" style={rowStyle}>
                    <Col md style={colStyle}>
                        <div style={divLevel}><label htmlFor="">Status</label></div>
                        <div style={divText}>{state.status}</div>
                        
                    </Col>
                    <Col md style={colStyle}>
                        <div style={divLevel}><label>Profile Picture</label></div>
                        <div style={divText}><Image style={{width:'80px'}} src={ADMIN_BACKEND_IMAGE_URL+file}/></div>
                    </Col>
                </Row>
                </div>
            </Container>
        </AdminLayout>
    )    
}

const rowStyle = {
    paddingTop:'10px',
    marginLeft:'20px'
}
const colStyle = {
    paddingTop:'10px',
    fontSize:'20px'
}
const divLevel = {
    fontSize:'25px',
    fontFamily:'sans-serif'
}
const divText = {
    paddingTop:'5px',
}