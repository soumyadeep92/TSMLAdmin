import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Logo from '../assets/mj-logo.png';
import LogoSmall from '../assets/mj-small-logo.png';
import { Home, Power, Users } from 'react-feather';
import { useNavigate } from 'react-router';

const SideBar = () => {
  const navigate = useNavigate();
  const isToggled = useSelector((state) => state.toggle.isToggled);
  const [showDropdown, setShowDropDown] = useState(false);
  const handledropDown = () => {
    //setShowDropDown(!showDropdown)
    setShowDropDown((prev) => !prev)
  }
  // const activeLink = (index)=>{
  //   setShowDropDown((prev) => {
  //     console.warn("prev ", prev);
  //   });
  //   console.warn("showDropdown", showDropdown,'isToggled',isToggled);
  //   activeRef.current.forEach((ref) => {
  //     if (ref) {
  //         ref?.classList.remove('active');
  //     }
  //   });
  //   if (activeRef.current[index]) {
  //     activeRef.current[index]?.classList.add('active');
  //   }

  // }

 console.log('showDropdown', showDropdown);

  const logout = ()=>{
    localStorage.clear();
    navigate('/');
  }
  
  return (
    <div 
    className={`sidebar ${isToggled ? 'collapsedBlock' : 'expandBlock'}`}
      style={{
        height: '100vh',
        overflowY: 'auto',
      }}
    >

      {isToggled === true ?
        <div className='text-center logo-block'><Image src={LogoSmall} /></div>
        :
        <div className='text-center logo-block'><Image src={Logo} /></div>
      }
      <ul className='left-sidebar-menu'>
        <li>
          {isToggled === true ?
            <Home />
            :
            <Link to="/dashboard">Dashboard</Link>
          }
        </li>
        <li>
          {isToggled === true ?
            <Users />
            :
            <Link to="#" onClick={handledropDown}>User Management</Link>
          }
        </li>
        {isToggled === false && showDropdown &&
          <ul>
            
            <li><Link to="/list-user">User List</Link></li>
            <li><Link to="/list-user-type">User Type</Link></li>
            <li><Link to="/list-cvr-mode">CVR Mode</Link></li>
            <li><Link to="/list-category">Category</Link></li>
            <li><Link to="/list-material">Material</Link></li>
            <li><Link to="/list-product">Product</Link></li>
            <li><Link to="/list-reason">Reason</Link></li>
            <li><Link to="/list-standard">Standard</Link></li>

          </ul>
        }
        <li>
          {isToggled === true ?
            <Power />
            :
            <Link onClick={logout} to={'/'}>Logout</Link>
          }
        </li>
      </ul>
    </div>
  )
}

export default SideBar