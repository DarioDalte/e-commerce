import React from "react";
import styles from "./validation.module.css";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useState, useRef } from "react";
import axios from "axios";
import Head from "next/head";
import {useRouter} from "next/router";



function Validation() {
  const [values, setValues] = useState({ showPassword: false });
  const [emailError, setEmailError] = useState(false);
  const [pwError, setPwError] = useState(false);
  const passwordRef = useRef();
  const emailRef = useRef();
  const router = useRouter();


  const submitHandler = (e) => {
    e.preventDefault();
    let regExpL = /[a-zA-Z]/g;
    let regExpN = /[0-9]/g;
    const password = passwordRef.current.value;
    const email = emailRef.current.value;
    // console.log(email);
    // console.log(password);

    if (email.trim().length < 6 || !email.includes("@")) {
      setEmailError(true);
      if (
        password.trim().length < 6 ||
        !regExpN.test(password) ||
        !regExpL.test(password)
      ) {
        setPwError(() => true);
        return;
  
      }
      return;
    }

    if (
      password.trim().length < 6 ||
      !regExpN.test(password) ||
      !regExpL.test(password)
    ) {
      setPwError(() => true);
      return;

    }

    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const url = "http://localhost:80/react-backend/";
    axios.post(url, formData)
    .then(res=>{
      console.log(res.data);
      if(res.data === 1){
        console.log("si");
        router.push({pathname: "../Home/Home", query: { email: email }})
      }else{
        console.log("no");

      }

      
      }
    )
    .catch(err=> console.log(err));
  
  };

  const emailChangeHandler = () => {
    const email = emailRef.current.value;
    if (email.trim().length >= 6 && email.includes("@")) {
      setEmailError(false);
    }
  };

  const emailBlurHandler = () => {
    const email = emailRef.current.value;
    if (email.trim().length < 6 || !email.includes("@")) {
      setEmailError(true);
    }
  };

  const pwChangeHandler = () => {
    let regExpL = /[a-zA-Z]/g;
    let regExpN = /[0-9]/g;
    const password = passwordRef.current.value;
    if (
      password.trim().length >= 6 &&
      regExpN.test(password) &&
      regExpL.test(password)
    ) {
      setPwError(false);
    }
  };

  const pwBlurHandler = () => {
    let regExpL = /[a-zA-Z]/g;
    let regExpN = /[0-9]/g;
    const password = passwordRef.current.value;
    if (
      password.trim().length < 6 ||
      !regExpN.test(password) ||
      !regExpL.test(password)
    ) {
      setPwError(true);
    }
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div className={styles["container"]}>
        <div className={styles["login-container"]}>
          <div className={styles["login-left"]}>
            <div className={styles["lock"]}>
              <LockIcon sx={{ color: "white" }} />
            </div>
            <h1 className={styles["title"]}>Log-In</h1>
            <form onSubmit={submitHandler}>
              <TextField
                className={styles["input"]}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                color="secondary"
                error={emailError}
                inputRef={emailRef}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
              />
              <FormControl className={styles["input"]} variant="outlined">
                <InputLabel
                  color="secondary"
                  htmlFor="outlined-adornment-password"
                >
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  color="secondary"
                  inputRef={passwordRef}
                  onChange={pwChangeHandler}
                  onBlur={pwBlurHandler}
                  error={pwError}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <button className={styles["btn-li"]}>Log In</button>
            </form>
            <div className={styles["contact-container"]}>
              <a href="http://google.com" className={styles["contact"]}>
                <TwitterIcon sx={{ color: "mediumturquoise" }} />
              </a>
              <a href="http://google.com" className={styles["contact"]}>
                <WhatsAppIcon sx={{ color: "#1cdf1c" }} />
              </a>
              <a href="http://google.com" className={styles["contact"]}>
                <EmailIcon sx={{ color: "purple" }} />
              </a>
            </div>
          </div>
          <div className={styles["login-right"]}>
            <h1>Bentornato</h1>
            <p>Se non possiedi un account registrati</p>
            <span className={styles["btn-su"]}>Sign Up</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Validation;
