import React from 'react'
import { Menu, Search, Mail, Bell } from 'react-feather';
import { useDispatch } from 'react-redux';
import { toggleState } from '../redux/slices/toggleSlice';
import { Card, InputGroup, Form, Row, Col, Image } from 'react-bootstrap';
import ProfilePicture from '../assets/profileImage.png';

const Header = () => {
  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(toggleState()); // Dispatch the toggle action
  };

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
                  <span className="notification">20</span>
                </li>
                <li>
                  <div className='pro-img-block'>
                    <div>
                      <Image src={ProfilePicture} />
                    </div>
                    <div className='ml-10'>
                      <span className='user-name'>Ramesh Roy </span>
                      <span className='user-role'>Admin</span>
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