import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Menu} from 'react-feather';
import Header from '../component/Header';
import { useDispatch, useSelector } from 'react-redux';
import SideBar from '../component/SideBar';
const AdminLayout = ({ children }) => {
    const isToggled = useSelector((state) => state.toggle.isToggled); 
    return (
        <>
          <SideBar/>
            <div className={`content ${isToggled? 'collapsedBlock': 'expandBlock'}`}>
                <Container className='mb-50'>
                <Header/>     
                    <div className='main-content-block'>
                            { children }
                    </div>
                </Container>
                <div className='footer w-100'>© mJunction. All rights reserved 2024</div>
            </div>
        </>
    )

}
export default AdminLayout