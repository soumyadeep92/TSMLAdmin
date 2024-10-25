import AdminLayout from '../../layout/AdminLayout';
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_CUSTOMER_API_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';

export const EditMaterial = ()=>{
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [apiData, setApiData] = useState({});
    const [state, setState] = useState(
        {
            material: "",
            status: "",
        }
    );
    
    const editMaterial = async () => {
        if (!state.material ) {
            setError(true)
            return false;
        }
        
        const data = { 'material_name': state.material, 'status': state.status };
        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}edit-material/${id}`,{
            method:'post',
            body:JSON.stringify(data),
            headers:{
                "Content-Type": "application/json"
            }
        });
        if (result.response.status === true) {
            navigate('/list-material');
        }
    }
    
    const formClear = async (e) => {
        e.preventDefault();
        setState({
            material: "",
            status: "",
        })
    }

    const getApiDatas = async () => {
        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}get-material-by-id/${id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (result.success === true && result.response.data) {
            let itemElements = {};
            itemElements = {
                id: result.response.data.id,
                material: result.response.data.material_name,
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
                material: apiData.material,
                status: apiData.status,
            }
        );
    },[apiData.id])
    

    return(
        <AdminLayout>
            <Container fluid="true">
                <Row>
                    <Col sm={3}><p className='page_left_panel'>Edit Material</p></Col>
                    <Col sm={5}></Col>
                    <Col sm={4}><p className='page_right_panel'>Dashboard / Edit Material</p></Col>
                </Row>
                <Row style={{backgroundColor:'white', borderRadius:'1%',margin:'2px 1px'}}>
                <Form style={{padding:'25px 20px 25px 25px'}}>
                    <Row className="g-2">
                        <Col md>
                            <Form.Label>Material</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Control value={state.category} onChange={(e) => { setState({ ...state, category: e.target.value }) }} type="text" />
                            {error && !state.category && <span style={invalidInput}>Enter Material</span>}
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
                        <Button onClick={editMaterial} style={submitbuttonStyle}>Update</Button>
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