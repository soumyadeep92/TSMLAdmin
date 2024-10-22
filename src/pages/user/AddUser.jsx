import AdminLayout from '../../layout/AdminLayout'
import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button,InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_API_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';

export const AddUser = () => {
    const navigate = useNavigate();
    const inputFile = useRef(null);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [userStatus, setUserStatus] = useState([]);
    const [userRole, setUserRole] = useState([]);
    const [error, setError] = useState(false);
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
    const [erroremail, setErroremail] = useState(false);
    const [erroremailmsg, setErroremailMsg] = useState('');
    const [errorphone, setErrorphone] = useState(false);
    const [errorphonemsg, setErrorphoneMsg] = useState('');
    const [errorname, setErrorname] = useState(false);
    const [errornamemsg, setErrornameMsg] = useState('');
    const [errorcode, setErrorcode] = useState(false);
    const [errorcodemsg, setErrorcodeMsg] = useState('');
    const [errorfile, setErrorfile] = useState(false);
    const [errorfilemsg, setErrorfileMsg] = useState('');
    const addUser = async () => {
        if (!state.name || !state.phone || !state.email || !state.location || !state.status || !state.userId || !state.userType) {
            setError(true)
            return false;
        }
        if(file){
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            const maxSize = 5 * 1024; // 5KB
            if (!allowedTypes.includes(file.type)) {
                setErrorfile(true);
                setErrorfileMsg('Only JPEG, JPG, and PNG files are allowed!');
                return false; 
            }
            if (file.size > maxSize) {
                setErrorfile(true);
                setErrorfileMsg('File size must be less than 5KB!');
                return false; 
            }
        }else{
            setError(true)
            return false; 
        }
        const formData = new FormData();
        formData.append('profile_image', file);
        formData.append('username', state.name);
        formData.append('user_code', state.userId);
        formData.append('phone', state.phone);
        formData.append('email', state.email);
        formData.append('location', state.location);
        formData.append('user_status_name', state.status);
        formData.append('user_role_name', state.userType);
        formData.append('password', '123456');

        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}add-user`,{
            method:'post',
            body:formData,
            headers:{}
        });
        //result = await result.json();
        console.log('resulthhh',result);
        if (result.response.status === false && result.response.code === 5) {
            setErroremail(true);
            setErrorphone(false);
            setErrorname(false);
            setErrorcode(false);
            setErrorfile(false);
            setErroremailMsg(result.response.message);
            console.log('email',result.response.message);
            return false;
        }
        if (result.response.status === false && result.response.code === 6) {
            setErrorphone(true);
            setErroremail(false);
            setErrorname(false);
            setErrorcode(false);
            setErrorfile(false);
            setErrorphoneMsg(result.response.message);
            return false;
        }
        if (result.response.status === false && result.response.code === 7) {
            setErrorname(true);
            setErroremail(false);
            setErrorphone(false);
            setErrorcode(false);
            setErrorfile(false);
            setErrornameMsg(result.response.message);
            return false;
        }
        if (result.response.status === false && result.response.code === 8) {
            setErrorcode(true);
            setErroremail(false);
            setErrorphone(false);
            setErrorname(false);
            setErrorfile(false);
            setErrorcodeMsg(result.response.message);
            return false;
        }
        if (result.response.status === false && result.response.code === 9) {
            setErrorfile(true);
            setErrorcode(false);
            setErroremail(false);
            setErrorphone(false);
            setErrorname(false);
            setErrorfileMsg(result.response.message);
            return false;
        }
        if (result.response.status === true) {
            navigate('/list-user');
        }
        // for (var pair of formData.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]);
        // }
    }

    const formClear = async (e) => {
        e.preventDefault();
        setState({
            name: "",
            userId: "",
            userType: "",
            phone: "",
            email: "",
            location: "",
            status: "",
        })
        setFile(null);
        setFileName('')
    }
    const browserBtn = ()=>{
        inputFile.current.click();
    }
    
    useEffect(()=>{
        setFileName(file?.name);
    },[file])
    
    useEffect( () => {
        async function fetchData() {
            let resultStatus = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get-status`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setUserStatus(resultStatus.response.statusDetails);
            let resultRole = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}list-role`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setUserRole(resultRole.response.data);
        }
        fetchData();
        
    }, [setUserStatus,setUserRole])

    return (
        <AdminLayout>
           
            <Container fluid="true">
                <Row>
                    <Col sm={3}><p style={{ fontSize: "30px", fontWeight: "bold", fontFamily: "auto", marginTop: "20px" }}>Add User</p></Col>
                    <Col sm={6}></Col>
                    <Col sm={3}><p style={{ fontSize: "20px", fontFamily: "auto", marginTop: "25px", textAlign:'right' }}><Link to="/dashboard" style={{ textDecoration: 'none' }}>Dashboard</Link> / <Link to="/add-user" style={{ textDecoration: 'none' }}>Add User</Link></p></Col>
                </Row>
                <Row style={{backgroundColor:'white', borderRadius:'1%',margin:'2px 1px'}}>
                <Form style={{padding:'25px 20px 25px 25px'}}>
                    <Row className="g-2">
                        <Col md>
                            <Form.Label>Name</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Control value={state.name} onChange={(e) => { setState({ ...state, name: e.target.value }) }} type="text" />
                            {error && !state.name && <span style={invalidInput}>Enter Name</span>}
                            {errorname && <span style={invalidInput}>{errornamemsg}</span>}
                        </Col>
                        <Col md>
                            <Form.Label>User Id</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Control value={state.userId} onChange={(e) => { setState({ ...state, userId: e.target.value }) }} type="text" />
                            {error && !state.userId && <span style={invalidInput}>Enter UserId</span>}
                            {errorcode && <span style={invalidInput}>{errorcodemsg}</span>}
                        </Col>
                    </Row>
                    <Row className="g-2" style={row_style}>
                        <Col md>
                            <Form.Label>User Type</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Select aria-label="Floating label select example" value={state.userType} onChange={(e) => { setState({ ...state, userType: e.target.value }) }}>
                                <option>Select Type</option>
                                {
                                    userRole.map((item,index)=>{
                                        if(item.created_by === JSON.parse(localStorage.getItem('user')).id ){
                                            return <option key={item.id} value={item.role_name}>{item.role_name}</option>
                                        }
                                        return true;
                                    })
                                }
                            </Form.Select>
                            {error && !state.userType && <span style={invalidInput}>Select Type</span>}
                        </Col>
                        <Col md>
                            <Form.Label>Phone No.</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Control value={state.phone} onChange={(e) => { setState({ ...state, phone: e.target.value }) }} type="text" />
                            {error && !state.phone && <span style={invalidInput}>Enter Phne</span>}
                            {errorphone && <span style={invalidInput}>{errorphonemsg}</span>}
                        </Col>
                    </Row>
                    <Row className="g-2" style={row_style}>
                        <Col md>
                            <Form.Label>Email</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Control value={state.email} onChange={(e) => { setState({ ...state, email: e.target.value }) }} type="email" />
                            {error && !state.email && <span style={invalidInput}>Enter Email</span>}
                            {erroremail && <span style={invalidInput}>{erroremailmsg}</span>}
                        </Col>
                        <Col md>
                            <Form.Label>Location</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Control value={state.location} onChange={(e) => { setState({ ...state, location: e.target.value }) }} type="text" />{error && !state.location && <span style={invalidInput}>Enter Location</span>}
                        </Col>
                    </Row>
                    <Row className="g-2" style={row_style}>
                        <Col md>
                            <Form.Label>Status</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Select aria-label="Floating label select example" value={state.status} onChange={(e) => { setState({ ...state, status: e.target.value }) }}>
                                <option>Select Status</option>
                                {
                                    userStatus.map((item,index)=>
                                    <option key={item.id} value={item.status}>{item.status}</option>
                                    )
                                }
                                
                            </Form.Select>
                            {error && !state.status && <span style={invalidInput}>Select Status</span>}
                        </Col>
                        <Col md>
                            {/* <Form.Label>Upload User Image</Form.Label><span style={asteriskStyle}> *</span>
                            <Form.Control type="file" ref={inputFile} onChange={(e)=>{setState({...state,file: e.target.files[0]})}} />
                            { error && !state.file && <span style={invalidInput}>Choose File</span>} */}

                            <Form.Label>Upload User Image</Form.Label><span style={asteriskStyle}> *</span>
                            <InputGroup>
                            <Form.Control style={{display:"none"}} type="file" ref={inputFile} onChange={(e)=>{setFile(e.target.files[0])}} />
                            <Form.Control  value={fileName} disabled/>
                            <InputGroup.Text onClick={browserBtn} style={{cursor:"pointer"}}>Browser</InputGroup.Text>
                            </InputGroup>
                            { error && !file && <span style={invalidInput}>Choose File</span>}
                            {errorfile && <span style={invalidInput}>{errorfilemsg}</span>}

                        </Col>
                    </Row>
                </Form>
                </Row>
                <Row className="g-2" style={{ marginLeft: "629px" }}>
                    <Col md style={{ textAlign: "right" }}>
                        <Button onClick={formClear} style={clearbuttonStyle}>Clear</Button>
                    </Col>
                    <Col md>
                        <Button onClick={addUser} style={submitbuttonStyle}>Add</Button>
                    </Col>
                </Row>
            </Container>
            
        </AdminLayout>
    )
}
const invalidInput = {
    color: "red"
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

const row_style = {
    marginTop: "20px"
}
const asteriskStyle = {
    color: "red"
}