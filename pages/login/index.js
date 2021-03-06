import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./login.module.css";
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
import Head from "next/head";
import Link from "next/link";
import Loading from "../../UI/loading/Loading";
import { useSelector, useDispatch } from "react-redux";

function Index(props) {
  const [values, setValues] = useState({ showPassword: false });
  const [msgError, setMsgError] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.isLogged);
  const userEmail = useSelector((state) => state.email);
  const [isLoading, setIsLoading] = useState(true);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const regExpL = /[a-zA-Z]/g;
  const regExpN = /[0-9]/g;

  useEffect(() => {
    if (isLogged === null) {
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
            if (res.data.success) {
              dispatch({
                type: "LOGGED",
                email: res.data.user.email,
                name: res.data.user.name,
              });
              router.push({ pathname: "../home" });
            } else {
              dispatch({ type: "NOT_LOGGED" });
              setIsLoading(false);
            }
          })
          .catch((err) => {
            dispatch({ type: "NOT_LOGGED" });
            setIsLoading(false);
          });
      } else {
        dispatch({ type: "NOT_LOGGED" });
        setIsLoading(false);
        setIsDisplayed(true);
      }
    } else if (isLogged === true) {
      router.push({ pathname: "../home" });
    } else {
      setIsLoading(false);
      setIsDisplayed(true);
    }
  }, []);

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

  const submitHandler = (e) => {
    e.preventDefault();
    emailBlurHandler();
    passwordBlurHandler();

    if (passwordIsValid && emailIsValid) {
      setIsLoading(true);
      setIsDisplayed(true);
      let data = {
        email: enteredEmail,
        password: enteredPassword,
      };
      const url = "https://php-e-commerce-api.herokuapp.com/api/user/login.php";

      axios
        .post(url, data)
        .then((res) => {
          if (res.data.success) {
            localStorage.setItem("token", res.data.token);
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
                setIsLoading(false);
                if (res.data.success) {
                  dispatch({
                    type: "LOGGED",
                    email: res.data.user.email,
                    name: res.data.user.name,
                  });
                  router.push({ pathname: "../home" });
                }
              });
          } else {
            setIsLoading(false);
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

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Loading open={isLoading}/>
      {isDisplayed ? (
        <div className={styles["body"]}>
          <div className={styles["container"]}>
            <div className={styles["form"]}>
              <div className={styles["lock"]}>
                <LockIcon sx={{ color: "white" }} />
              </div>
              <h1 className={styles["title"]}>Log-In</h1>
              {msgError ? (
                <h3 className={styles["msg-error"]}>{msgError}</h3>
              ) : (
                ""
              )}
              <form onSubmit={submitHandler}>
                <TextField
                  className={styles["input"]}
                  id="outlined-basic"
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
                <button className={styles["primary-btn"]}>Log In</button>
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
            <div className={styles["change"]}>
              <h1 className={styles.titleRight}>Bentornato</h1>
              <p className={styles.subtitle}>
                Se non possiedi un account registrati
              </p>
              <Link href="/../registration">
                <a className={styles["secondary-btn"]}>Sign Up</a>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Index;
