import React, { useState } from 'react';
import { Button, Nav, Navbar, Container, Image, InputGroup, Form, Row, Col, Badge } from 'react-bootstrap';
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
import { NavLink, Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

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
            {!isCollapsed ? <Link className="nav-link-main" to="/dashboard">
                <div>
                  <><Image src={HomeIcon} /><span className="link-text">Dashboard</span></> 
                </div>
              </Link>: <><Button className="btn-mj-small" href="/dashboard"><Image src={HomeIcon} /></Button><br/></>
            }
              <br />
              {!isCollapsed ?

                <Nav.Link className="nav-link-main">
                  <NavDropdown title="User Management" id="collasible-nav-dropdown">
                    <Image src={UsersGroupIcon} />
                    <NavDropdown.Item>
                      <Link to="/userGroup/addUser" className="ddMenu" >Add User</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to="/userGroup/listUser" className="ddMenu" >User List</Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav.Link>

              : <><Button className="btn-mj-small" href="#usersgroup"><Image src={UsersGroupIcon} /></Button><br/></>}
              <br />
              {!isCollapsed ? <Nav.Link className="nav-link-main" href="#logout">
                <div>
                  <><Image src={LogoutIcon} /><span className="link-text">Logout</span></> 
                </div>
              </Nav.Link>: <Button className="btn-mj-small" href="#usersgroup"><Image src={LogoutIcon} /></Button>}
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
                <Row className="g-4">
                  <Col>
                    <Image src={MessagePicture} />
                    <span className="badgemessage">19</span>
                  </Col>
                  <Col>
                    <Image src={NotificationPicture} />
                    <span className="badgenotif">19</span>
                  </Col>
                </Row>
              </Container>
            </div>
            <div className="end-div">
              <Container fluid="true">
                <Row className="g-2">
                  <Col>
                    <Image src={ProfilePicture} />
                  </Col>
                  <Col>
                    <Form.Label style={{ fontSize: "16px", position: "absolute" }} className="mb-1">Ramesh Roy</Form.Label>
                    <br />
                    <Form.Label style={{ fontSize: "14px" }} className="mb-1">Admin</Form.Label>
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
