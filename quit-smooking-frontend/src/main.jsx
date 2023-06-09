import React from 'react'
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { RegisterProvider } from './context/SignUpContext'
import { ProfileProvider } from './context/ProfileContext';

//logo
import logo from './images/logoBig.png';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <ProfileProvider>
    <RegisterProvider>
      <div className="bg-gray-500">
        <div className="bg-white sm:bg-white sm:mx-auto sm:max-w-[412px] h-[800px] w-[412px] overflow-y-auto scrollbar-hide">
          <div className="logo">
          <img src={logo} width="200" height="150" />
          </div>
          <div>
            <App />
          </div>
        </div>
      </div>
      </RegisterProvider>
    </ProfileProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);