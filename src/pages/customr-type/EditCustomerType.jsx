import AdminLayout from '../../layout/AdminLayout';
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_CUSTOMER_API_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';

export const EditCustomerType = ()=>{
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [apiData, setApiData] = useState({});
    const [state, setState] = useState(
        {
            customer_type: "",
            status: "",
        }
    );
    
    const editCustomerType = async () => {
        if (!state.customer_type ) {
            setError(true)
            return false;
        }
        
        const data = { 'customer_type': state.customer_type, 'status': state.status };
        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}edit-customer-type/${id}`,{
            method:'post',
            body:JSON.stringify(data),
            headers:{
                "Content-Type": "application/json"
            }
        });
        if (result.response.status === true) {
            navigate('/list-customer-type');
        }
    }
    
    const formClear = async (e) => {
        e.preventDefault();
        setState({
            customer_type: "",
            status: "",
        })
    }

    const getApiDatas = async () => {
        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}get-customer-type-by-id/${id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (result.success === true && result.response.data) {
            let itemElements = {};
            itemElements = {
                id: result.response.data.id,
                customer_type: result.response.data.customer_type,
                status: result.response.data.status,
            };
            
            setApiData(itemElements);
        } 
    }    
   
    useEffect(()=>{
        getApiDatas();
        setState(
            {
                ...state,
                customer_type: apiData.customer_type,
                status: apiData.status,
            }
        );
    },[apiData.id])
    

    return(
        <AdminLayout>
            <Container fluid="true">
                <Row>
                    <Col sm={3}><p style={{ fontSize: "30px", fontWeight: "bold", fontFamily: "auto", marginTop: "20px" }}>Edit Customer Type</p></Col>
                    <Col sm={6}></Col>
                    <Col sm={3}><p style={{ fontSize: "20px", fontFamily: "auto", marginTop: "25px", textAlign:'right' }}><Link to="/dashboard" style={{ textDecoration: 'none' }}>Dashboard</Link> / <Link to="/edit-customer-type" style={{ textDecoration: 'none' }}>Edit Customer Type</Link></p></Col>
                </Row>
                <Row style={{backgroundColor:'white', borderRadius:'1%',margin:'2px 1px'}}>
                <Form style={{padding:'25px 20px 25px 25px'}}>
                    <Row className="g-2">
                        <Col md>
                            <Form.Label>Customer Type</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Control value={state.customer_type} onChange={(e) => { setState({ ...state, customer_type: e.target.value }) }} type="text" />
                            {error && !state.customer_type && <span style={invalidInput}>Enter Customer Type</span>}
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
                        <Button onClick={editCustomerType} style={submitbuttonStyle}>Update</Button>
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