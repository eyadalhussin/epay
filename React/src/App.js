import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { useAuth } from './auth/AuthContext';
import Main from './components/Main/Main';
import ENavbar from './components/Navbar/ENavbar';
import Sidebar from './components/Sidebar/Sidebar';
import { KUNDE1TOKEN, MITARBEITERTOKEN } from './constants/constants';



function App() {

  return (
    <BrowserRouter>
      <div className="App d-flex">
        <Sidebar />
        <div className="no-pad-container d-flex f-direction-c">
          {/* <ENavbar></ENavbar> */}
          <Main></Main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
