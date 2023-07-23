// import React from 'react'
// import './otp.css';
// function Otp() {

    

//   return (
//     <div className="container height-100 d-flex justify-content-center align-items-center"> 
//         <div className="position-relative"> 
//             <div className="card cardd p-2 text-center"> 
//                 <h6>Please enter the one time password 
//                 <br/>
//                  to verify your account
//                 </h6>
//             <div> 
//             <span className='success'>A code has been sent to</span> 
//             <small className='success'>*******9897</small> 
//         </div> 
//         <div id="otp" className="inputs d-flex flex-row justify-content-center mt-2"> 
//             <input className="m-2 text-center form-control rounded" type="text" id="first" maxlength="1" /> 
//             <input className="m-2 text-center form-control rounded" type="text" id="second" maxlength="1" /> 
//             <input className="m-2 text-center form-control rounded" type="text" id="third" maxlength="1" /> 
//             <input className="m-2 text-center form-control rounded" type="text" id="fourth" maxlength="1" /> 
//         </div> 
//         <div className="mt-4"> 
//             <button className="btn btn-danger px-4 validate">Validate</button> 
//         </div> 
//         </div> 
//         <div className="card cardd-2"> 
//             <div className="content d-flex justify-content-center align-items-center"> 
//                 <span>Didn't get the code</span> 
//                     <a href="#" className="text-decoration-none ms-3">Resend(1/3)</a> 
//             </div>
//         </div> 
//     </div>
// </div>
//   )
// }

// export default Otp



import React, { useRef } from 'react';
import './otp.css';

function Otp() {

    const inputsRef = useRef([]);

    const handleChange = (e, index) => {
      const value = e.target.value;
      if (value && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    };
  
    const handleKeyDown = (e, index) => {
      if (e.key === 'Backspace' && !e.target.value) {
        if (index > 0) {
          inputsRef.current[index - 1].focus();
        }
      }
    };

  return (
    <div className="container height-100 d-flex justify-content-center align-items-center">
      <div className="position-relative">
        {/* Rest of your code */}
        <div className="position-relative"> 
            <div className="card cardd p-2 text-center"> 
                <h6>Please enter the one time password 
                <br/>
                 to verify your account
                </h6>
            <div> 
            <span className='success'>A code has been sent to</span> 
            <small className='success'>*******9897</small> 
        </div> 
        <div id="otp" className="inputs d-flex flex-row justify-content-center mt-2">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              ref={(ref) => (inputsRef.current[index] = ref)}
              className="m-2 text-center form-control rounded"
              type="text"
              maxLength="1"
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        {/* Rest of your code */}
        <div className="mt-4"> 
            <button className="btn btn-danger px-4 validate">Validate</button> 
        </div> 
        </div> 
        <div className="card cardd-2"> 
            <div className="content d-flex justify-content-center align-items-center"> 
                <span>Didn't get the code</span> 
                    <a href="#" className="text-decoration-none ms-3">Resend(1/3)</a> 
            </div>
        </div> 
      </div>
    </div>
    </div>
  );
}

export default Otp;
