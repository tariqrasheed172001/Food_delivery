import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import useNotification from '../snackbars/SnackBar'


// const url = "http://localhost:8000/login";
const url = "https://hungrezy-api-tariqrasheed172001.onrender.com/login";


function Login() {

  const [conf,setConf] = useNotification();
  const [flag,setFlag] = useState(false);
  const [userData,setUserData] = useState('');

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const [formData,setFormData] = useState({
    email:"",
    passwordd:"",
  });


  const handleSubmit = (event) =>{
    event.preventDefault();

    axios.post(url,formData)
    .then((res)=>{
      // console.log(res);
      // console.log(res.data.message);
      // console.log(res.data.message.length);
      console.log(res);
      if(res.status === 200){
        setConf({ msg: res.data.message, variant: "success" });
        setFlag(true);
        setUserData(res.data.user);
        
        console.log(res.data.user.name);
        
      }else if(res.status === 201){
        setConf({ msg: res.data.message, variant: "error" });
      }
    }).catch((error) => {
      setConf({ msg: "An error occurred. Please try again later.", variant: "error" });
    });
  }
  console.log(userData);
  

  useEffect(()=>{
    if(flag){
      navigate('/',{state: userData});
    }
  },[flag,navigate])
  


  return (
    <section className="vh-100" style={{backgroundImage: "url('https://img.freepik.com/free-photo/top-view-food-frame-with-copy-space_23-2148723447.jpg?w=1800&t=st=1690031132~exp=1690031732~hmac=18d18e87eb328ede2fcd45f97baa50783672d55f3293e1952d842afb0b3c3884')"}}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://images.unsplash.com/photo-1654922207993-2952fec328ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form method="POST" onSubmit={(event) => {
                handleSubmit(event);
            }}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i
                          className="fas fa-cubes fa-2x me-3"
                          style={{ color: "#ff6219" }}
                        ></i>
                        <span className="h1 fw-bold mb-0">Logo</span>
                      </div>

                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Sign into your account
                      </h5>

                      <div className="form-outline mb-5">
                        <input
                          required
                          placeholder="Email address"
                          type="email"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          name="email"
                          onChange={(event)=>{
                              event.preventDefault();
                              setFormData({...formData,[event.target.name]: event.target.value});
                            }}
                        />
                        
                      </div>

                      <div className="form-outline mb-5">
                        <input
                          required
                          placeholder="Password"
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                          name="passwordd"
                          onChange={(event)=>{
                              event.preventDefault();
                              setFormData({...formData,[event.target.name]: event.target.value});
                            }}
                        />
                      </div>

                      <div className="pt-1 mb-4 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg">
                          login
                        </button>
                      </div>

                      <a className="small text-muted">Forgot password?</a>
                        <p
                          className="mb-5 pb-lg-2"
                          style={{ color: "#393f81" }}
                          style={{cursor:"pointer"}}
                          onClick={()=>navigate("/register")}
                        >
                          Don't have an account?{" "}
                          <a style={{ color: "#393f81",cursor:"pointer" }}>Register here</a>
                        </p>

                      <a href="#!" className="small text-muted">
                        Terms of use.
                      </a>
                      <a href="#!" className="small text-muted">
                        Privacy policy
                      </a>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
