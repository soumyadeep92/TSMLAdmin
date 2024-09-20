import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import { LoginComponent } from './components/LoginComponent';
import { AddUsers } from './components/AddUsers';
// import { ListUsers } from './components/ListUsers';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';

function App() {
  const location = useLocation();
  const shouldShowSidebar = () => {
    const { pathname } = location;
    const check = ['/'].includes(pathname);
    return !check;
  };
  return (
    <div>
      {shouldShowSidebar() && <Sidebar />}
      <Routes>
        <Route exact path='/' element={<LoginComponent />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
        <Route exact path='/userGroup/addUser' element={<AddUsers />} />
        {/* <Route exact path='/userGroup/listUser' element={<ListUsers />} /> */}
      </Routes>
    </div>
  );
}

export default App;
