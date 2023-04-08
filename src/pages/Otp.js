import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { userVerify } from "../services/Apis"

const Otp = () => {
  const [otp, setOtp] = useState("");

  const location = useLocation();

  const navigate = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();

    if (otp === "") {
      alert("Enter Your Otp")
    } else if (!/[^a-zA-Z]/.test(otp)) {
      alert("Enter Valid Otp")
    } else if (otp.length < 6) {
      alert("Otp Length minimum 6 digit")
    } else {
      const data = {
        otp, email: location.state
      }

      const response = await userVerify(data);
      if (response.status === 200) {
        localStorage.setItem("userdbtoken", response.data.userToken);
        alert(response.data.message);
        setTimeout(() => {
          navigate("/dashboard")
        }, 5000)
      } else {
        alert(response.response.data.error)
      }
    }
  }

  return (
    <div className="signup_main">
      <div className="login_container">
        <div className="header">Enter Your OTP</div>
        <div className="inputbox">
          <input
            type="text"
            name="otp"
            placeholder="Enter your OTP..."
            onChange={(e) => setOtp(e.target.value)}
            autoComplete="off"
          />
          <hr />
        </div>

        <div className="btn_div">
          <button
            style={{ marginTop: "30px" }}
            className="signup_btn"
            onClick={LoginUser}
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  )
}

export default Otp;