import React from 'react';
import {Image,Container,Row,Col,Form,Button} from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import LoginImg from '../assets/Login.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';

export const LoginComponent=()=>{
    return(
        <>
            <Container fluid="true">
                <Row>
                    <Col>
                        <Image src={LoginImg}/>
                    </Col>
                    <Col>
                        <p style={textStyle}>Please login to your account</p>
                        <Form style={loginStyle}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>User Id/Mobile No</Form.Label><span style={asteriskStyle}> *</span>
                                <Form.Control type="email" style={formStyle} required="required"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label><span style={asteriskStyle}> *</span>
                                <Form.Control type="password" style={formStyle} required="required"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupValidCaptcha" style={formStyle}>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        value="YR890" style={captchaStyle} disabled />
                                    <InputGroup.Text>
                                        <FontAwesomeIcon style={iconStyle} icon={faRefresh} />
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupCaptcha">
                                <Form.Label>Captcha</Form.Label><span style={asteriskStyle}> *</span>
                                <Form.Control type="captcha" style={formStyle} />
                            </Form.Group>
                            <a style={forgotPasswordStyle}>Forgot Password?</a>
                            <Form.Check
                                label={`Remember Me`} style={remenberMeStyle}
                            />
                            
                            <Button style={buttonStyle}>Sign In</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

const buttonStyle={
    width:"392px",
    height:"50px",
    radius:"5px",
    backgroundColor:"#3A85E5",
    marginTop:"15px"
}
const textStyle={
    marginLeft:"50px",
    fontSize:"30px",
    fontWeight:"700",
    textAlign:"center",
    fontFamily:"Mulish",
    width:"399px",
    height:"18px",
    marginTop:"170px"
}
const formStyle={
    width:"392px",
    height:"40px",
    radius:"5px"
}
const loginStyle={
    paddingTop:"50px",
    paddingLeft:"50px"
}
const forgotPasswordStyle={
    float:"right",
    paddingRight:"25px",
    color:"#3A85E5"
}
const captchaStyle={
    color:"#3A85E5",
    fontWeight:"bold",
    fontStyle:"italic"
}
const iconStyle={
    color:"#3A85E5"
}
const remenberMeStyle={
    color:"#3A85E5"
}
const asteriskStyle={
    color:"red"
}