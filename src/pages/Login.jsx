import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import LoginImg from '../assets/Login.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'react-feather';
import { ADMIN_BACKEND_BASE_URL } from '../constant';
import SweetAlert from 'react-bootstrap-sweetalert';

export const Login = () => {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [captcha, setCaptcha] = useState(null);
    const [captchacode, setCaptchacode] = useState(null);
    const [errors, setErrors] = useState({});

    const [show1, setShow1] = useState(false);
    const handleShow1 = () => setShow1(true);
    const handleClose1 = () => setShow1(false);

    const [showAlert, setShowAlert] = useState(false);
    const handleLogin = () => {
        setShowAlert(true);
            setTimeout(() => {
                navigate('/dashboard'); // Redirect after alert is shown
            }, 2000);
    }
    const handleClose = () => {
        setShowAlert(false);
    };


    const validateForm = () => {
        const newErrors = {};
        // if (!email) newErrors.email = 'Email is required';
        // else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';

        // if (!mobile) newErrors.mobile = 'Mobile number is required';
        // else if (!/^\d{10}$/.test(mobile)) newErrors.mobile = 'Mobile number must be 10 digits long';

        if (!username) newErrors.username = 'User Id / Mobile No is required';


        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters long';

        if (!captcha) newErrors.captcha = 'Captcha is required';
        else if (captcha.length < 6) newErrors.captcha = 'Captcha must be at least 6 characters long';
        else if (captcha.length > 6) newErrors.captcha = 'Captcha must be at least 6 characters long';

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            const newErrors = {};
            if (captcha === captchacode) {

                let result = await fetch(`${ADMIN_BACKEND_BASE_URL}api/v1/auth/login`, {
                    method: 'post',
                    body: JSON.stringify({ username, password }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                result = await result.json();
                
                if( result.response.admin_login ){
                
                    if (result.success === false && result.response.message.message === 'Username is wrong') {
                        newErrors.username = 'Invalid Username';
                        setErrors(newErrors);
                        return false;
                    }
                    if (result.success === false && result.response.message.message === 'Incorrect password') {
                        newErrors.password = 'Invalid Password';
                        setErrors(newErrors);
                        return false;
                    }
                    const userInfo = {
                        "id":result.response.userData.id,
                        "username":result.response.userData.username,
                        "phone":result.response.userData.phone,
                        "user_code":result.response.userData.user_code,
                        "email":result.response.userData.email,
                        "profile_pic":result.response.userData.profile_pic,
                        "user_role_id":result.response.userData.user_role_id,
                        "user_status_id":result.response.userData.user_status_id,
                    };
                    localStorage.setItem('user', JSON.stringify(userInfo))
                    localStorage.setItem('token', result.response.access_token)
                    handleLogin();
                }else{
                    handleShow1();
                    console.log("else");
                }    
            } else {
                newErrors.captcha = 'Invalid Captcha';
                setErrors(newErrors);
            }
            // Reset form
            setUsername('');
            setPassword('');
            setCaptcha('');
            setErrors({});
        } else {
            setErrors(validationErrors);
        }
    };

    //generate chapcha
    const generateCaptcha = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    useEffect(() => {
        setCaptchacode(generateCaptcha());
    }, [setCaptchacode]);

    const refreshCaptcha = () => {
        setCaptchacode(generateCaptcha());
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
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
                    You are not authorized!
                </SweetAlert>
            )}
            {showAlert && (
                <SweetAlert
                    success
                    title="Login Successful!"
                    onConfirm={handleClose}
                    confirmBtnBsStyle="success"
                >
                    Welcome to your dashboard!
                </SweetAlert>
            )}
            <Container fluid className="vh-100">
                <Row className="h-100">
                    <Col xs={12} lg={7} className="d-flex align-items-center px-0">
                        <div className='login-bg-wrap w-100' style={{ backgroundImage: `url(${LoginImg})` }}>
                        </div>
                    </Col>
                    <Col xs={12} lg={5} className="d-flex align-items-center justify-content-center px-0">
                        <div className='login-wrap w-100'>
                            <p style={textStyle}>Please login to your account</p>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label>User Id/Mobile No</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control
                                        type="number"
                                        name="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        style={formStyle} required="required" />
                                    {errors.username && <span style={error}>{errors.username}</span>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Label>Password</Form.Label><span style={asteriskStyle}> *</span>
                                    <div style={{display:'flex', alignItems:'center'}}>
                                    <Form.Control
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={formStyle} required="required" />
                                    <span onClick={togglePasswordVisibility} style={{ background: 'none', border: 'none', cursor: 'pointer', position:'relative',right:'30px' }}>
                                        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                    </span>
                                    </div>
                                    {errors.password && <span style={error}>{errors.password}</span>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupValidCaptcha" style={formStyle}>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            value={captchacode} style={captchaStyle} disabled />
                                        <InputGroup.Text>
                                            <FontAwesomeIcon onClick={refreshCaptcha} style={iconStyle} icon={faRefresh} />
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupCaptcha">
                                    <Form.Label>Captcha</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control
                                        type="captcha"
                                        value={captcha}
                                        onChange={(e) => setCaptcha(e.target.value)}
                                        style={formStyle} />
                                    {errors.captcha && <span style={error}>{errors.captcha}</span>}
                                </Form.Group>
                                <a style={forgotPasswordStyle}>Forgot Password?</a>
                                <Form.Check
                                    label={`Remember Me`} style={remenberMeStyle}
                                />

                                <Button type='submit' style={buttonStyle}>Sign In</Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

const error = {
    color: 'red',
    fontSize: '0.9em',
    marginTop: '5px',
}
const buttonStyle = {
    width: "392px",
    height: "50px",
    radius: "5px",
    backgroundColor: "#3A85E5",
    marginTop: "15px"
}
const textStyle = {
    fontSize: "30px",
    fontWeight: "700",
    textAlign: "left",
    fontFamily: "Mulish",
}
const formStyle = {
    width: "392px",
    height: "40px",
    radius: "5px"
}
const forgotPasswordStyle = {
    float: "right",
    paddingRight: "90px",
    color: "#3A85E5"
}
const captchaStyle = {
    color: "#3A85E5",
    fontWeight: "bold",
    fontStyle: "italic"
}
const iconStyle = {
    color: "#3A85E5"
}
const remenberMeStyle = {
    color: "#3A85E5"
}
const asteriskStyle = {
    color: "red"
}