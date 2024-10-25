import AdminLayout from '../../layout/AdminLayout';
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_CUSTOMER_API_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';

export const EditCvrMode = ()=>{
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [modes, setModes] = useState({});
    const [state, setState] = useState(
        {
            mode: "",
            status: "",
        }
    );
    
    const editCvrMode = async () => {
        if (!state.mode ) {
            setError(true)
            return false;
        }
        
        const data = { 'mode_name': state.mode, 'status': state.status };
        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}edit-cvr-mode/${id}`,{
            method:'post',
            body:JSON.stringify(data),
            headers:{
                "Content-Type": "application/json"
            }
        });
        if (result.response.status === true) {
            navigate('/list-cvr-mode');
        }
    }
    
    const formClear = async (e) => {
        e.preventDefault();
        setState({
            mode: "",
            status: "",
        })
    }

    const getCvrMode = async () => {
        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}get-mode-by-id/${id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (result.success === true && result.response.data) {
            let itemElements = {};
            itemElements = {
                id: result.response.data.id,
                userMode: result.response.data.mode_name,
                userStatus: result.response.data.status,
            };
            
            setModes(itemElements);
        } 
    }    
   
    useEffect(()=>{
        getCvrMode();
        setState(
            {
                ...state,
                mode: modes.userMode,
                status: modes.userStatus,
            }
        );
    },[modes.id])
    

    return(
        <AdminLayout>
            <Container fluid="true">
                <Row>
                    <Col sm={3}><p className='page_left_panel'>Edit Cvr Mode</p></Col>
                    <Col sm={5}></Col>
                    <Col sm={4}><p className='page_right_panel'>Dashboard / Edit Cvr Mode</p></Col>
                </Row>
                <Row style={{backgroundColor:'white', borderRadius:'1%',margin:'2px 1px'}}>
                <Form style={{padding:'25px 20px 25px 25px'}}>
                    <Row className="g-2">
                        <Col md>
                            <Form.Label>Cvr Mode</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Control value={state.mode} onChange={(e) => { setState({ ...state, mode: e.target.value }) }} type="text" />
                            {error && !state.mode && <span style={invalidInput}>Enter Cvr Mode</span>}
                        </Col>
                        <Col md>
                            <Form.Label>Status</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Select aria-label="Floating label select example" value={state.status} onChange={(e) => { setState({ ...state, status: e.target.value }) }}>
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </Form.Select>
                        </Col>
                    </Row>
                </Form>
                </Row>
                <Row className="g-2" style={{ marginLeft: "629px" }}>
                    <Col md style={{ textAlign: "right" }}>
                        <Button onClick={formClear} style={clearbuttonStyle}>Clear</Button>
                    </Col>
                    <Col md>
                        <Button onClick={editCvrMode} style={submitbuttonStyle}>Update</Button>
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