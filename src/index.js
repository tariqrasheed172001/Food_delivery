import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from "./componants/authentication/Login"
import Register from './componants/authentication/Register';
import Home from './componants/Home/Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import Otp from './componants/OTP/Otp';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   
  <SnackbarProvider anchorOrigin={{vertical: 'top',horizontal:'center'}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/send-otp" element={<Otp />}/>
      </Routes>
    </BrowserRouter>
  </SnackbarProvider> 
  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
