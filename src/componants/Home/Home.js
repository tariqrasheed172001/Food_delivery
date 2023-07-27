import { Link, useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import useNotification from '../snackbars/SnackBar'

function Home() {

  const [auth,setAuth] = useState(false);
  const [name,setName] = useState("");
  const [message,setMessage] = useState("");

  const [conf,setConf] = useNotification();

  const location = useLocation();

  const receivedData = location.state;

  axios.defaults.withCredentials = true;

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API}/`,{withCredentials:true})
    .then(res => {
      console.log(res);
      if(res.data.Status === 'Success'){
        setAuth(true);
        setName(res.data.name);
      }else{
        setAuth(false);
        setMessage(res.data.Error)
      }
    }).catch((error) => console.log(error));
  },[]);


  const handleLogout = (event) => {

    axios.get(`${process.env.REACT_APP_API}/logout`,{withCredentials:true})
    .then(res => {
      console.log(res);
      window.location.reload(true);
      setAuth(false);
    }).catch((error) => console.log(error));
    
    
  }

  return (
    <div className='container mt-4'> 
      {
        auth ? 
        <div>
          <h3>You are loggedIn {receivedData?.name}</h3>
          <h4>{receivedData?.email}</h4>
          <h4>{receivedData?.phone}</h4>
          <button className='btn btn-danger' onClick={handleLogout} >logout</button>
        </div>
        :
        <div>
          <h3>{message}</h3>
          <Link to="/login" className='btn btn-primary'>Login Now</Link>
        </div>
      }
    </div>
  )
}

export default Home