import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import { LoginComponent } from './components/LoginComponent';
import { AddUser } from './components/AddUser';
import { ListUser } from './components/ListUser';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';

const isBackgroundRed = true;

function App() {
  const location = useLocation();
  const shouldShowSidebar = () => {
    const { pathname } = location;
    const check = ['/'].includes(pathname);
    return !check;

  };
  return (
    <div className={isBackgroundRed ? 'background-red' : 'background-blue'} >

      {shouldShowSidebar() && <Sidebar />}
      <Routes>
        <Route exact path='/' element={<LoginComponent />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
        <Route exact path='/userGroup/addUser' element={<AddUser />} />
        <Route exact path='/userGroup/listUser' element={<ListUser />} />
      </Routes>
    </div>
  )
}

export default App;
