import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Logo from '../assets/mj-logo.png';
import LogoSmall from '../assets/mj-small-logo.png';
import { Home, Power, Users } from 'react-feather';
import { useNavigate } from 'react-router';

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isToggled = useSelector((state) => state.toggle.isToggled);
  const [userDropdown, setUserDropdown] = useState(false);
  const [masterDropdown, setMasterDropdown] = useState(false);
  const [customerDropdown, setCustomerDropdown] = useState(false);

  // Function to log out
  const logout = useCallback(() => {
    localStorage.clear();
    navigate('/');
  }, [navigate]);

  // Toggle the user dropdown state
  const handleuserdropDown = () => {
    setUserDropdown((prev) => !prev);
  };
  const handlemasterdropDown = useCallback(() => {
    setMasterDropdown((prev) => !prev);
  }, []);

  const handlecustomerdropDown = useCallback(() => {
    setCustomerDropdown((prev) => !prev);
  }, []);

  useEffect(() => {
    const userManagementRoutes = ['/list-user', '/list-user-type', '/role-permission'];
    const masterManagementRoutes = ['/list-cvr-mode', '/list-category', '/list-material', '/list-product', '/list-reason', '/list-standard'];
    const customerManagementRoutes = ['/list-customer-type'];
    if (userManagementRoutes.includes(location.pathname)) {
      setUserDropdown(true);
      setMasterDropdown(false);
      setCustomerDropdown(false);
    }
    if (masterManagementRoutes.includes(location.pathname)) {
      setUserDropdown(false); 
      setMasterDropdown(true);
      setCustomerDropdown(false);
    }
    if (customerManagementRoutes.includes(location.pathname)) {
      setUserDropdown(false); 
      setMasterDropdown(false);
      setCustomerDropdown(true);
    }
  }, [location.pathname]);

  return (
    <div className={`sidebar ${isToggled ? 'collapsedBlock' : 'expandBlock'}`}
    style={{
      height: '100vh',
      overflowY: 'auto',
    }}>
      {isToggled ? (
        <div className="text-center logo-block"><Image src={LogoSmall} /></div>
      ) : (
        <div className="text-center logo-block"><Image src={Logo} /></div>
      )}
      <ul className="left-sidebar-menu">
        <li>
          {isToggled ? (
            <Home />
          ) : (
            <Link to="/dashboard">Dashboard</Link>
          )}
        </li>
        <li>
          {isToggled ? (
            <Users />
          ) : (
            <Link to="#" onClick={handleuserdropDown}>User Management</Link>
          )}
        </li>
        {!isToggled && userDropdown && (
          <ul>
            <li><Link to="/list-user">User List</Link></li>
            <li><Link to="/list-user-type">User Type</Link></li>
            <li><Link to="/role-permission">Role Permission</Link></li>
          </ul>
        )}
        <li>
          {isToggled ?
            <Users />
            :
            <Link to="#" onClick={handlemasterdropDown}>Master Management</Link>
          }
        </li>
        {!isToggled && masterDropdown && (
          <ul>
            <li><Link to="/list-cvr-mode">CVR Mode</Link></li>
            <li><Link to="/list-category">Category</Link></li>
            <li><Link to="/list-material">Material</Link></li>
            <li><Link to="/list-product">Product</Link></li>
            <li><Link to="/list-reason">Reason</Link></li>
            <li><Link to="/list-standard">Standard</Link></li>

          </ul>
        )}
        <li>
          {isToggled ?
            <Users />
            :
            <Link to="#" onClick={handlecustomerdropDown}>Customer Management</Link>
          }
        </li>
        {!isToggled && customerDropdown && (
          <ul>
            <li><Link to="/list-customer-type">Type List</Link></li>
          </ul>
        )}
        <li>
          {isToggled ? (
            <Power />
          ) : (
            <Link onClick={logout} to={'/'}>Logout</Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
