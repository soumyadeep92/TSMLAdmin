import React, { useState } from 'react';
import { Button, Nav, Navbar, Container, Image, InputGroup, Form, Row, Col } from 'react-bootstrap';
import './Sidebar.css';
import MjLogo from '../assets/mj-logo.png';
import MjSmallLogo from '../assets/mj-small-logo.png';
import HomeIcon from '../assets/home.png';
import UsersGroupIcon from '../assets/usersgroup.png';
import LogoutIcon from '../assets/logout.png';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfilePicture from '../assets/profileImage.png';
import MessagePicture from '../assets/mail.png';
import NotificationPicture from '../assets/bell.png';

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div className={`app ${isCollapsed ? 'sidebar-open' : ''}`}>
        <div className={`sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
          <Nav className="flex-column">
            {!isCollapsed ? <div style={ImageStyle}><Image src={MjLogo} /></div> :
              <div style={SmallImageStyle}><Image src={MjSmallLogo} /></div>}
            <br /><hr />
            <div id="navdiv">
              <Nav.Link href="#dashboard">
                {!isCollapsed ? <div><Image src={HomeIcon} /><span className="link-text">Dashboard</span></div> : <div><Image src={HomeIcon} /></div>}
              </Nav.Link>
              <br />
              <Nav.Link href="#usersgroup">
                {!isCollapsed ? <div><Image src={UsersGroupIcon} /><span className="link-text">User Management</span></div> : <div><Image src={UsersGroupIcon} /></div>}
              </Nav.Link>
              <br />
              <Nav.Link href="#logout">
                {!isCollapsed ? <div><Image src={LogoutIcon} /><span className="link-text">Logout</span></div> : <div><Image src={LogoutIcon} /></div>}
              </Nav.Link>
              <br />
            </div>
          </Nav>
        </div>
        <div className="main-content">
          <Navbar expand="lg" className="py-6">
            <Container fluid="true">
              <div className="left-div">
                <Row>
                  <Col>
                    <Button className="btn-lg btn-toggle" variant="light" onClick={toggleSidebar}>
                      ☰
                    </Button>
                  </Col>
                  <Col xs="9">
                    <InputGroup className="mb-3">
                      <Form.Control placeholder="Search Here" />
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faSearch} />
                      </InputGroup.Text>
                    </InputGroup>
                  </Col>
                </Row>
              </div>
            </Container>
            <div className="right-div">
              <Container fluid="true">
                <Row>
                  <Col xs="3">
                    <Col>
                      <Image src={NotificationPicture} />
                    </Col>
                    <Col>
                      <Image src={MessagePicture} />
                    </Col>
                  </Col>
                  <Col>
                    <Image src={ProfilePicture} />
                  </Col>
                  <Col>
                    <Form.Label style={{ fontSize: "16px" }} className="mb-1">Ramesh Roy</Form.Label>
                    <Form.Label style={{ fontSize: "14px" }} className="mb-6">Admin</Form.Label>
                  </Col>
                </Row>
              </Container>
            </div>
          </Navbar>
        </div>
      </div >
    </>
  );
};

const ImageStyle = {
  width: "90px",
  height: "49px",
  marginLeft: "100px",
  marginTop: "-30px"
}

const SmallImageStyle = {
  width: "33px",
  height: "33px",
  marginLeft: "20px"
}
