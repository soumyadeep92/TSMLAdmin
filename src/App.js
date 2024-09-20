import './App.css';
import {Routes,Route,useLocation} from "react-router-dom";
import { LoginComponent } from './components/LoginComponent';
import { AddUser } from './components/AddUser';
import { ListUser } from './components/ListUser';
import {Sidebar} from './components/Sidebar';
import { Dashboard } from './components/DashBoard';
function App() {
  // return (
  //   <div className="App">
      
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
  //   </div>
  // );
  const isBackgroundRed = true;
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
      <Route exact path='/dashboard' element={<Dashboard/>} />
      <Route exact path='/userGroup/addUser' element={<AddUser/>} />
      <Route exact path='/userGroup/listUser' element={<ListUser/>} />
    </Routes>

    </div>
  );
}

export default App;
