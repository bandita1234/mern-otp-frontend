import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import "../styles/SignUp.css";
import { sentOtpFunction } from "../services/Apis";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const sendOtp = async (e) => {
    if (email === "") {
      alert("Enter Your Email !");
    } else if (!email.includes("@")) {
      alert("Enter Valid Email !");
    } else {
      const data = {
        email: email,
      };

      const response = await sentOtpFunction(data);
      if (response.status === 200) {
        navigate("/user/otp",{state:email})
    } else {
        alert(response.response.data.error);
    }
    }
  };

  return (
    <div className="signup_main">
      <div className="login_container">
        <div className="header">Welcome Back! LOGIN</div>
        <div className="inputbox">
          <input
            type="email"
            name="email"
            placeholder="Enter your Email..."
            onChange={(e) => handleChange(e)}
            autoComplete="off"
          />
          {/*<span>Email</span>*/}
          <hr />
        </div>

        <div className="btn_div">
          <button
            style={{ marginTop: "30px" }}
            className="signup_btn"
            onClick={sendOtp}
          >
            LOG IN
          </button>
        </div>
        <div className="u_signupFooter">
          <p>
            Not registered yet ? <a href="/signup">Register here!</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
