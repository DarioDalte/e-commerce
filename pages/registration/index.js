import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../login/login.module.css";
import personalStyles from "./registration.module.css";
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
import useInput from "../../components/hooks/use-input";
import Modal from "../../components/modal/Modal";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

function Index(props) {
  const [values, setValues] = useState({ showPassword: false });
  const [showModal, setShowModal] = useState(false);
  const [msgError, setMsgError] = useState();
  const [emailError, setEmailError] = useState(false);

  const regExpL = /[a-zA-Z]/g;
  const regExpN = /[0-9]/g;
  const router = useRouter();
  const isMobile = useMediaQuery({ query: `(max-width: 39rem)` });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = "Bearer " + localStorage.getItem("token");
      axios
        .get(
          "https://php-e-commerce-api.herokuapp.com/api/user/user-info.php",
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            router.push({ pathname: "../home" });
          }
        })
        .catch((err) => console.log(err));
    }
  }, [router]);

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
    if (nameIsValid && surnameIsValid && emailIsValid && passwordIsValid) {
      setShowModal((showModal) => !showModal);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    nameBlurHandler();
    surnameBlurHandler();
    emailBlurHandler();
    passwordBlurHandler();

    if (nameIsValid && surnameIsValid && emailIsValid && passwordIsValid) {
      const data = {
        name: enteredName,
        surname: enteredSurname,
        email: enteredEmail,
        password: enteredPassword,
      };
      axios
        .post(
          "https://php-e-commerce-api.herokuapp.com/api/user/create.php",
          data
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            isMobile ? "" : setShowModal(true);
            setMsgError();
            setEmailError(false);

            let data = {
              email: enteredEmail,
              password: enteredPassword,
            };
            const url =
              "https://php-e-commerce-api.herokuapp.com/api/user/login.php";

            axios
              .post(url, data)
              .then((res) => {
                console.log(res.data);
                if (res.data.success) {
                  console.log("si");
                  localStorage.setItem("token", res.data.token);
                  {isMobile && router.push({ pathname: "../home" });}

                }
              })
              .catch((err) => console.log(err));
          } else {
            setEmailError(true);
            setMsgError(res.data.message);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const emailChangeHandler = (e) => {
    setEmailError(false);
    emailHandler(e);
  };
  return (
    <>
      <Head>
        <title>Registration</title>
      </Head>
      {isMobile ? (
        <div className={styles["body"]}>
          <div className={styles["container"]}>
            <div className={styles["form"]}>
              <div className={styles["lock"]}>
                <LockIcon sx={{ color: "white" }} />
              </div>
              <h1 className={styles["title"]}>Sign-Up</h1>
              {msgError ? (
                <h3 className={`${styles["msg-error"]}`}>{msgError}</h3>
              ) : (
                ""
              )}
              <form onSubmit={submitHandler}>
                {showModal && (
                  <Modal email={enteredEmail} onClick={modalHandler} />
                )}
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
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                  error={emailHasError || emailError}
                  inputProps={{ maxLength: 25 }}
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
                  {passwordHasError && (
                    <p className={personalStyles["err"]}>
                      La password deve contenere almeno{" "}
                      <strong>6 caratteri</strong> tra cui{" "}
                      <strong>una lettera</strong> e <strong>un numero</strong>
                    </p>
                  )}
                </FormControl>

                <button className={styles["primary-btn"]}>Sign Up</button>
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
            <div className={`${personalStyles["change"]} ${styles["change"]}`}>
              <h1>Bevenuto</h1>
              <p>Se possiedi già un account, accedi!</p>
              <Link href="/../login">
                <a className={styles["secondary-btn"]}>Log In</a>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles["body"]}>
          <div className={styles["container"]}>
            <div className={`${personalStyles["change"]} ${styles["change"]}`}>
              <h1>Bevenuto</h1>
              <p>Se possiedi già un account, accedi!</p>
              <Link href="/../login">
                <a className={styles["secondary-btn"]}>Log In</a>
              </Link>
            </div>
            <div className={styles["form"]}>
              <div className={styles["lock"]}>
                <LockIcon sx={{ color: "white" }} />
              </div>
              <h1 className={styles["title"]}>Sign-Up</h1>
              {msgError ? (
                <h3 className={`${styles["msg-error"]}`}>{msgError}</h3>
              ) : (
                ""
              )}
              <form onSubmit={submitHandler}>
                {showModal && (
                  <Modal email={enteredEmail} onClick={modalHandler} />
                )}
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
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                  error={emailHasError || emailError}
                  inputProps={{ maxLength: 25 }}
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
                  {passwordHasError && (
                    <p className={personalStyles["err"]}>
                      La password deve contenere almeno{" "}
                      <strong>6 caratteri</strong> tra cui{" "}
                      <strong>una lettera</strong> e <strong>un numero</strong>
                    </p>
                  )}
                </FormControl>

                <button className={styles["primary-btn"]}>Sign Up</button>
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
        </div>
      )}
    </>
  );
}

export default Index;
