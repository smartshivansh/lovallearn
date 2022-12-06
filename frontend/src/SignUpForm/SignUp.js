import { useState } from "react";
import OTPInput from "otp-input-react";

import SignInSuccessfull from "./SignInSuccessfull";
import Spinners from "../Spinner/Spinner";

import { useNavigate } from "react-router-dom";

import classes from "./SignUp.module.css";

const SignUp = () => {
  const [otp, setOtp] = useState();
  const [content, setContent] = useState("");
  const [sucess, setSucess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");
    const data = JSON.stringify({ otp, email });
    setLoading(true);
    fetch("http://doornextshop.com/otpverify", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: data,
    })
      .then((res) => res.json())
      .then((res) => JSON.parse(res))
      .then((data) => {
        if (data.msg === "OTP_MATCHED") {
          // navigate("/app/sucess");
          setSucess(true);
          setLoading(false);
        } else {
          setContent("Incorrect OTP");
          setLoading(false);
        }
      });
  };

  if (sucess) {
    return <SignInSuccessfull />;
  }

  const onFocusHandler = () => {
    setContent("");
  };

  return (
    <div className={classes.container}>
      {loading && <Spinners />}
      <div className={classes.left}>
        <h1 className={classes.welcome}>Welcome to LOCALLEARN</h1>
      </div>
      <div className={classes.right}>
        <form className={classes.form} onSubmit={formSubmitHandler}>
          <h3 className={classes.h3}>
            Please enter the OTP we have sent on your registered mobile/email.
          </h3>

          <OTPInput
            value={otp}
            onChange={setOtp}
            autoFocus
            OTPLength={6}
            otpType="number"
            disabled={false}
            className={classes.input}
          />
          <p className={classes.error}>{content}</p>
          <button className={classes.submit}>Let's get started</button>
        </form>
      </div>
      <h4 className={classes.doions}>Powered By Doions Pvt Ltd</h4>
    </div>
  );
};

export default SignUp;