import React, { useState } from "react";
import "../styles/SignUp.css";
import {useNavigate} from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import {registerfunction} from "../services/Apis";

const SignUp = () => {
  const [showpass, setShowPass] = useState(false);

  const [inputdata, setInputData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // console.log(inputdata);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputData({ ...inputdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = inputdata;

    if (username === "") {
      alert("Enter Your Name");
    } else if (email === "") {
      alert("Enter Your Email");
    } else if (!email.includes("@")) {
      alert("Enter Valid Email");
    } else if (password === "") {
      alert("Enter Your Password");
    } else if (password.length < 6) {
      alert("password length minimum 6 character");
    } else {
      const response = await registerfunction(inputdata);
      // console.log(response);
       if(response.status === 200){
        setInputData({...inputdata,username:"",email:"",password:""})
        navigate("/")
       }else{
        alert(response.response.data.error);
       }
    }
  };

  return (
    <div className="signup_main">
      <div className="signup_container">
        <div className="header">Sign Up</div>

        <div className="inputbox">
          <input
            type="text"
            name="username"
            placeholder="Enter your Name"
            onChange={handleChange}
            autoComplete="off"
          />
          {/*<span>Email</span>*/}
          <hr />
        </div>

        <div className="inputbox">
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            onChange={handleChange}
            autoComplete="off"
          />
          {/*<span>Email</span>*/}
          <hr />
        </div>
        <div className="pass_input">
          <div className="inputbox">
            <input
              type={!showpass ? "password" : "text"}
              name="password"
              placeholder="Enter your Password"
              onChange={handleChange}
            />
            {/*<span>Email</span>*/}
            <hr />
          </div>
          <div className="showpassword" onClick={() => setShowPass(!showpass)}>
            {" "}
            {!showpass ? (
              <AiOutlineEye style={{ fontSize: "1.5em" }} />
            ) : (
              <AiOutlineEyeInvisible style={{ fontSize: "1.5em" }} />
            )}
          </div>
        </div>

        <div className="btn_div">
          <button
            style={{ marginTop: "30px" }}
            className="signup_btn"
            onClick={handleSubmit}
          >
            REGISTER
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
