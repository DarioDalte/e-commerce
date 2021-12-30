import { useState } from "react";
import { useRouter } from "next/router";
import personalStyles from "./registration.module.css";
import styles from "../login/login.module.css";
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
import axios from "axios";
import useInput from "../hooks/use-input";
import Modal from "../modal/Modal";

function Registration(props) {
  const [values, setValues] = useState({ showPassword: false });
  const [showModal, setShowModal] = useState(false);

  const regExpL = /[a-zA-Z]/g;
  const regExpN = /[0-9]/g;

  const {
    value: enteredName,
    valueIsValid: nameIsValid,
    hasError: nameHasError,
    valueHandler: nameHandler,
    inputBlur: nameBlurHandler,
    reset: nameReset,
  } = useInput((name) => name.trim().length >= 3);
  const {
    value: enteredSurname,
    valueIsValid: surnameIsValid,
    hasError: surnameHasError,
    valueHandler: surnameHandler,
    inputBlur: surnameBlurHandler,
    reset: surnameReset,
  } = useInput((surname) => surname.trim().length >= 3);

  const {
    value: enteredPassword,
    valueIsValid: passwordIsValid,
    hasError: passwordHasError,
    valueHandler: passwordHandler,
    inputBlur: passwordBlurHandler,
    reset: passwordReset,
  } = useInput(
    (password) =>
      password.trim().length >= 6 &&
      regExpN.test(password) &&
      regExpL.test(password)
  );

  const {
    value: enteredEmail,
    valueIsValid: emailIsValid,
    hasError: emailHasError,
    valueHandler: emailHandler,
    inputBlur: emailBlurHandler,
    reset: emailReset,
  } = useInput(
    (email) =>
      email.includes("@") && email.includes(".") && email.trim().length > 6
  );

  const modalHandler = () => {
    nameBlurHandler();
    surnameBlurHandler();
    emailBlurHandler();
    passwordBlurHandler();

    if (nameIsValid && surnameIsValid && emailIsValid && passwordIsValid) {
      setShowModal((showModal) => !showModal);
    }
  };

  const submitHandler = (paese, provincia, indirizzo, date, CAP, TEL, CF) => {
    // console.log(paese);
    // console.log(provincia);
    // console.log(indirizzo);
    // console.log(date);
    // console.log(CAP);
    // console.log(TEL);
    // console.log(CF);
  
    if (nameIsValid && surnameIsValid && emailIsValid && passwordIsValid) {
      console.log("siii");
    }
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  return (
    <>
      <div className={styles["container"]}>
        <div className={`${personalStyles["change"]} ${styles["change"]}`}>
          <h1>Bevenuto</h1>
          <p>Se possiedi già un account, accedi!</p>
          <span onClick={props.onClick} className={styles["secondary-btn"]}>
            Log In
          </span>
        </div>
        <div className={styles["form"]}>
          <div className={styles["lock"]}>
            <LockIcon sx={{ color: "white" }} />
          </div>
          <h1 className={styles["title"]}>Sign-Up</h1>
          {/* {msgError ? <h3 className={styles["msg-error"]}>{msgError}</h3> : ""} */}
          <form>
            {showModal && <Modal onSbmt={submitHandler} onClick={modalHandler} />}
            <TextField
              className={styles["input"]}
              label="Nome"
              variant="outlined"
              color="secondary"
              value={enteredName}
              onChange={nameHandler}
              onBlur={nameBlurHandler}
              error={nameHasError}
            />
            <TextField
              className={styles["input"]}
              label="Cognome"
              variant="outlined"
              color="secondary"
              value={enteredSurname}
              onChange={surnameHandler}
              onBlur={surnameBlurHandler}
              error={surnameHasError}
            />
            <TextField
              className={styles["input"]}
              label="Email"
              variant="outlined"
              color="secondary"
              value={enteredEmail}
              onChange={emailHandler}
              onBlur={emailBlurHandler}
              error={emailHasError}
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
                onChange={passwordHandler}
                onBlur={passwordBlurHandler}
                error={passwordHasError}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {passwordHasError && (
                <p className={personalStyles["err"]}>
                  La password deve contenere almeno <strong>6 caratteri</strong>{" "}
                  tra cui <strong>una lettera</strong> e{" "}
                  <strong>un numero</strong>
                </p>
              )}
            </FormControl>

            <span onClick={modalHandler} className={styles["primary-btn"]}>
              Sign Up
            </span>
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
      </div>
    </>
  );
}

export default Registration;
